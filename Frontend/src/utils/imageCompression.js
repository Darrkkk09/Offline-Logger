export async function compressImage(file, maxWidth = 1280, quality = 0.7) {
  return new Promise((resolve, reject) => {
    // If the file is not an image, return original Blob
    if (!file || !file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let width = image.width;
      let height = image.height;

      // Calculate scaled dimensions maintaining aspect ratio
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Failed to get 2D canvas context"));
        return;
      }

      // Draw resized image onto canvas
      context.drawImage(image, 0, 0, width, height);

      // Export canvas content as a compressed JPEG Blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Image compression failed"));
          }
        },
        "image/jpeg",
        quality
      );
    };

    image.onerror = (error) => {
      URL.revokeObjectURL(objectUrl);
      reject(error);
    };

    image.src = objectUrl;
  });
}

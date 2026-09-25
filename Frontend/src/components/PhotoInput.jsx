import React, { useRef, useState, useEffect } from "react";
import { Camera, Image as ImageIcon, Trash2, CheckCircle2 } from "lucide-react";

/**
 * Polished photo capture/upload component for factory defect reporting
 */
export function PhotoInput({ photoBlob, onPhotoSelect, onPhotoRemove }) {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formattedSize, setFormattedSize] = useState("");

  useEffect(() => {
    if (!photoBlob) {
      setPreviewUrl(null);
      setFormattedSize("");
      return;
    }

    const url = URL.createObjectURL(photoBlob);
    setPreviewUrl(url);

    // Calculate human-readable Blob size
    const sizeInKb = (photoBlob.size / 1024).toFixed(1);
    setFormattedSize(`${sizeInKb} KB`);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [photoBlob]);

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoSelect(file);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Defect Photo Attachment <span className="text-slate-400 font-normal lowercase">(optional)</span>
        </label>
        {formattedSize && (
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Compressed: {formattedSize}
          </span>
        )}
      </div>

      {previewUrl ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 p-1.5 shadow-sm group flex items-center justify-center">
          <img
            src={previewUrl}
            alt="Defect Attachment Preview"
            className="w-full h-auto max-h-72 object-contain rounded-lg"
          />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onPhotoRemove}
              className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove Photo</span>
            </button>
          </div>
          <button
            type="button"
            onClick={onPhotoRemove}
            className="sm:hidden absolute top-2 right-2 bg-rose-600 text-white p-2 rounded-full shadow cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-slate-800 bg-slate-50/80 hover:bg-white rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group active:scale-[0.99]"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-slate-900 text-slate-600 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 group-hover:text-slate-900">
              Add Photo of Defect
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Tap to capture camera photo or select image file
            </p>
          </div>
        </div>
      )}

      {/* Hidden native input with environment camera trigger for mobile */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

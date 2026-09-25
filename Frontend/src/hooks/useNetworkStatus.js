import { useState, useEffect } from "react";

/**
 * Custom hook to monitor online/offline network connectivity.
 * Listens to browser window events and returns current status.
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
      ? navigator.onLine
      : true
  );

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

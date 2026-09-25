import React from "react";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { WifiOff, CheckCircle2, ShieldCheck } from "lucide-react";

/**
 * Reassuring operational banner explaining offline data protection
 */
export function NetworkStatus() {
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return (
      <div className="bg-amber-500/10 border border-amber-300/60 rounded-xl p-4 flex items-start gap-3 shadow-xs">
        <div className="p-2 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5">
          <WifiOff className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
            Operating in Offline Mode
          </h3>
          <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
            All tickets logged on the floor will be securely stored on this device in IndexedDB and synchronized automatically once network connectivity is restored.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-emerald-500/10 border border-emerald-300/60 rounded-xl p-3.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-emerald-950">
            Connected to Factory Network
          </p>
          <p className="text-[11px] text-emerald-700 font-medium">
            Pending floor tickets will sync automatically to the central server.
          </p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { ShieldAlert, Wifi, WifiOff, HardDriveUpload } from "lucide-react";

/**
 * Premium header component with product branding and live status metrics
 * 
 * @param {Object} props
 * @param {number} props.pendingCount - Number of tickets waiting to sync
 */
export function Header({ pendingCount = 0 }) {
  const isOnline = useNetworkStatus();

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs font-bold text-lg tracking-wider">
            FL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-900 text-base tracking-tight leading-none">
                FloorLog
              </h1>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider border border-slate-200">
                Floor Ops
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Offline Defect Logger
            </p>
          </div>
        </div>

        {/* Live operational status indicators */}
        <div className="flex items-center gap-2.5">
          {/* Pending ticket badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
            pendingCount > 0
              ? "bg-amber-50 text-amber-800 border-amber-200/80"
              : "bg-slate-100 text-slate-600 border-slate-200/80"
          }`}>
            <HardDriveUpload className={`w-3.5 h-3.5 ${pendingCount > 0 ? "text-amber-600" : "text-slate-400"}`} />
            <span>Pending: <strong>{pendingCount}</strong></span>
          </div>

          {/* Network status pill */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
            isOnline
              ? "bg-emerald-50 text-emerald-800 border-emerald-200/80"
              : "bg-rose-50 text-rose-800 border-rose-200/80"
          }`}>
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold">Online</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="font-semibold">Offline</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

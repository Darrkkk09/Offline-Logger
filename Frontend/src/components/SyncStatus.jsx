import React from "react";
import { SYNC_STATUS } from "../types/ticket";
import { CheckCircle2, RefreshCw, AlertTriangle, Clock } from "lucide-react";

/**
 * Visual badge indicator for ticket synchronization state
 * 
 * @param {Object} props
 * @param {string} props.status - "pending" | "syncing" | "synced" | "failed"
 */
export function SyncStatus({ status }) {
  switch (status) {
    case SYNC_STATUS.SYNCED:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Synced
        </span>
      );
    case SYNC_STATUS.SYNCING:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
          Syncing...
        </span>
      );
    case SYNC_STATUS.FAILED:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          Failed
        </span>
      );
    case SYNC_STATUS.PENDING:
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          Pending
        </span>
      );
  }
}

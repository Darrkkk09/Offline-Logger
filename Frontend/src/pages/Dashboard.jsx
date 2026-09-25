import React, { useState, useEffect, useCallback } from "react";
import { NetworkStatus } from "../components/NetworkStatus";
import { IssueForm } from "../components/IssueForm";
import { PendingQueue } from "../components/PendingQueue";
import { getAllTickets, deleteTicket } from "../db/database";
import { triggerSync } from "../sync/syncManager";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { RefreshCw, CheckCircle2, HardDriveUpload, Layers, ArrowLeft } from "lucide-react";

/**
 * Floor Logger Operational Application View (/app)
 * 
 * @param {Object} props
 * @param {Function} [props.onNavigateToLanding] - Handler to return to landing page
 */
export function Dashboard({ onNavigateToLanding }) {
  const isOnline = useNetworkStatus();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState("");

  const refreshTickets = useCallback(async () => {
    try {
      const loadedTickets = await getAllTickets();
      setTickets(loadedTickets);
    } catch (error) {
      console.error("Error loading tickets from IndexedDB:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTickets();
  }, [refreshTickets]);

  const pendingCount = tickets.filter(
    (t) => t.sync_status === "pending" || t.sync_status === "failed"
  ).length;

  const syncedCount = tickets.filter((t) => t.sync_status === "synced").length;

  // AUTOMATIC SYNC TRIGGER: Whenever device comes ONLINE, directly synchronize pending tickets!
  useEffect(() => {
    if (isOnline && pendingCount > 0 && !isSyncing) {
      console.log("[AutoSync] Device back online! Automatically triggering batch sync...");
      setIsSyncing(true);
      triggerSync()
        .then((result) => {
          refreshTickets();
          setSyncStatusMsg(`⚡ Connection restored! Auto-synced ${result.syncedCount} ticket(s) to MongoDB.`);
          setTimeout(() => setSyncStatusMsg(""), 5000);
        })
        .catch((err) => {
          console.error("[AutoSync Error]:", err);
          setSyncStatusMsg("Auto-sync failed. Retrying when connection stabilizes...");
        })
        .finally(() => {
          setIsSyncing(false);
        });
    }
  }, [isOnline, pendingCount, refreshTickets]);

  async function handleDeleteTicket(clientTicketId) {
    try {
      await deleteTicket(clientTicketId);
      await refreshTickets();
    } catch (err) {
      console.error("Error deleting ticket:", err);
    }
  }

  async function handleManualSync() {
    if (pendingCount === 0) {
      setSyncStatusMsg("All tickets are already synchronized with MongoDB!");
      setTimeout(() => setSyncStatusMsg(""), 4000);
      return;
    }

    if (!isOnline) {
      setSyncStatusMsg(`⚡ ${pendingCount} ticket(s) saved safely in local IndexedDB. Automatic sync will trigger as soon as network returns.`);
      setTimeout(() => setSyncStatusMsg(""), 5000);
      return;
    }

    try {
      setIsSyncing(true);
      setSyncStatusMsg("");
      const result = await triggerSync();
      await refreshTickets();
      setSyncStatusMsg(`Sync complete! Synced ${result.syncedCount} item(s) to MongoDB.`);
      setTimeout(() => setSyncStatusMsg(""), 4000);
    } catch (err) {
      console.error("Manual sync error:", err);
      setSyncStatusMsg(err.message || "Sync failed. Retrying later...");
    } finally {
      setIsSyncing(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Operational App Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onNavigateToLanding && (
              <button
                type="button"
                onClick={onNavigateToLanding}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to FloorLog</span>
              </button>
            )}

            <div className="hidden sm:block h-5 w-[1px] bg-slate-200"></div>

            <div>
              <h1 className="font-bold text-slate-900 text-base tracking-tight leading-none">
                Floor Logger Application
              </h1>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Operational Defect Entry & Queue Sync
              </p>
            </div>
          </div>

          {/* Network & Pending Badge */}
          <div className="flex items-center gap-2.5">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              pendingCount > 0
                ? "bg-amber-50 text-amber-800 border-amber-200/80"
                : "bg-slate-100 text-slate-600 border-slate-200/80"
            }`}>
              <HardDriveUpload className={`w-3.5 h-3.5 ${pendingCount > 0 ? "text-amber-600" : "text-slate-400"}`} />
              <span>Pending: <strong>{pendingCount}</strong></span>
            </div>

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

      {/* 2. Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-20">
        {/* Operational Status Banner */}
        <NetworkStatus />

        {/* 2-Column Responsive Layout: Issue Form + Sync Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Defect Reporting Form */}
          <div className="lg:col-span-7 space-y-6">
            <IssueForm onTicketSaved={refreshTickets} />
          </div>

          {/* Right Column: Sync Status Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900 text-base">Sync Control & Status</h3>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {isOnline ? "FastAPI Online" : "Offline Mode"}
                </span>
              </div>

              {/* Status Banner */}
              <div className="space-y-3">
                {pendingCount > 0 ? (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 space-y-1">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                      <HardDriveUpload className="w-4 h-4 text-amber-600" />
                      <span>{pendingCount} issue(s) waiting to sync</span>
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Tickets are securely stored in IndexedDB and will automatically batch sync to MongoDB when connected.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>All tickets synchronized</span>
                    </div>
                    <p className="text-xs text-emerald-800">
                      Local device storage and MongoDB server data are up to date.
                    </p>
                  </div>
                )}

                {syncStatusMsg && (
                  <p className="text-xs font-semibold text-slate-700 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                    {syncStatusMsg}
                  </p>
                )}
              </div>

              {/* Stats pill row */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="block text-[10px] uppercase font-bold text-slate-500">Pending</span>
                  <span className="text-sm font-bold text-amber-600 font-mono">{pendingCount}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="block text-[10px] uppercase font-bold text-slate-500">Synced</span>
                  <span className="text-sm font-bold text-emerald-600 font-mono">{syncedCount}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="block text-[10px] uppercase font-bold text-slate-500">Total</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">{tickets.length}</span>
                </div>
              </div>

              {/* Manual Sync Button */}
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl shadow-xs border border-slate-800 flex items-center justify-center gap-2 text-xs transition-all cursor-pointer active:scale-[0.99]"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin text-blue-400" : "text-slate-300"}`} />
                <span>
                  {isSyncing
                    ? "Synchronizing to MongoDB..."
                    : pendingCount === 0
                    ? "All Issues Synced"
                    : isOnline
                    ? "Sync Pending Tickets Now"
                    : "Saved Offline (Auto Sync When Online)"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Tickets List */}
        {isLoading ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-slate-400 text-xs">
            Loading tickets from device storage...
          </div>
        ) : (
          <PendingQueue tickets={tickets} onDeleteTicket={handleDeleteTicket} />
        )}
      </main>
    </div>
  );
}

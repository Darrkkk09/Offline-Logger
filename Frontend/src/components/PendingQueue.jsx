import React, { useState } from "react";
import { TicketCard } from "./TicketCard";
import { Inbox, Search, ArrowUpDown, X, Layers } from "lucide-react";
import { SYNC_STATUS } from "../types/ticket";

/**
 * Operations Ticket Queue component with search, tab filtering, sorting, and scroll container
 * 
 * @param {Object} props
 * @param {Array<import('../types/ticket').OfflineTicket>} props.tickets
 * @param {Function} [props.onDeleteTicket]
 */
export function PendingQueue({ tickets = [], onDeleteTicket }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "oldest"

  const pendingCount = tickets.filter(
    (t) => t.sync_status === SYNC_STATUS.PENDING || t.sync_status === SYNC_STATUS.FAILED
  ).length;
  const syncedCount = tickets.filter((t) => t.sync_status === SYNC_STATUS.SYNCED).length;

  // Search & Status filter
  let processedTickets = tickets.filter((ticket) => {
    // 1. Status Filter
    if (activeTab === "pending") {
      if (ticket.sync_status !== SYNC_STATUS.PENDING && ticket.sync_status !== SYNC_STATUS.FAILED) {
        return false;
      }
    } else if (activeTab === "synced") {
      if (ticket.sync_status !== SYNC_STATUS.SYNCED) {
        return false;
      }
    }

    // 2. Text Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const station = (ticket.station_id || "").toLowerCase();
      const serial = (ticket.serial_number || "").toLowerCase();
      const desc = (ticket.description || "").toLowerCase();

      return station.includes(q) || serial.includes(q) || desc.includes(q);
    }

    return true;
  });

  // Sorting logic
  processedTickets.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });

  if (tickets.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center space-y-3 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto shadow-inner">
          <Inbox className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">No Defect Issues Logged</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            New issues recorded on the floor will appear here in the local queue and sync automatically when connected.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search & Tab Filter Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-700" />
            <h2 className="text-base font-bold text-slate-900">
              Recent Floor Issues
            </h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-0.5 rounded-full border border-slate-200">
              {processedTickets.length} of {tickets.length}
            </span>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({tickets.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pending")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "pending"
                  ? "bg-white text-amber-800 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Pending ({pendingCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("synced")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "synced"
                  ? "bg-white text-emerald-800 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Synced ({syncedCount})
            </button>
          </div>
        </div>

        {/* Search Input & Sort Selector Row */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Station ID, Serial Number, or description..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Order Button */}
          <button
            type="button"
            onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold px-3.5 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span>{sortOrder === "newest" ? "Newest First" : "Oldest First"}</span>
          </button>
        </div>
      </div>

      {/* Ticket Cards Smooth Scroll Container */}
      {processedTickets.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-700">No issues match search query "{searchQuery}"</p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-xs text-blue-600 font-bold hover:underline"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="max-h-[650px] overflow-y-auto pr-1 space-y-3.5 scrollbar-thin">
          {processedTickets.map((ticket) => (
            <TicketCard
              key={ticket.client_ticket_id}
              ticket={ticket}
              onDelete={onDeleteTicket}
            />
          ))}
        </div>
      )}
    </div>
  );
}

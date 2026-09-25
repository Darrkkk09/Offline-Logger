import React, { useState, useEffect } from "react";
import { SyncStatus } from "./SyncStatus";
import { Clock, Cpu, MapPin, Trash2, Maximize2, X } from "lucide-react";

/**
 * Ticket Card component displaying offline ticket details and status
 * 
 * @param {Object} props
 * @param {import('../types/ticket').OfflineTicket} props.ticket
 * @param {Function} [props.onDelete]
 */
export function TicketCard({ ticket, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!ticket.photo) {
      setPhotoUrl(null);
      return;
    }

    const url = URL.createObjectURL(ticket.photo);
    setPhotoUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [ticket.photo]);

  const formattedDate = new Date(ticket.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });

  return (
    <>
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all space-y-3.5">
        {/* Header row with metadata badges and status */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {ticket.station_id}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              <Cpu className="w-3.5 h-3.5 text-slate-400" />
              {ticket.serial_number}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <SyncStatus status={ticket.sync_status} />
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(ticket.client_ticket_id)}
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                title="Delete Ticket"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Defect description text */}
        <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-normal">
          {ticket.description}
        </p>

        {/* Image Attachment Box Container (Uncropped, Full Aspect Ratio) */}
        {photoUrl && (
          <div className="relative rounded-xl overflow-hidden bg-slate-950/90 border border-slate-200/80 group p-1.5 flex items-center justify-center">
            <img
              src={photoUrl}
              alt="Defect Attachment"
              className="w-full h-auto max-h-[480px] object-contain rounded-lg group-hover:opacity-95 transition-opacity cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            />
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-3 right-3 bg-slate-900/85 hover:bg-slate-900 text-white px-2.5 py-1.5 rounded-lg backdrop-blur text-xs font-semibold flex items-center gap-1.5 shadow transition-all cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full View</span>
            </button>
          </div>
        )}

        {/* Footer timestamp & ticket UUID info */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {formattedDate}
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            ID: {ticket.client_ticket_id.slice(0, 8)}
          </span>
        </div>
      </div>

      {/* Lightbox Modal for Photo Inspection */}
      {isLightboxOpen && photoUrl && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{ticket.station_id}</span>
                <span className="text-xs text-slate-400 font-mono">({ticket.serial_number})</span>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 flex-1 overflow-auto flex items-center justify-center bg-black">
              <img
                src={photoUrl}
                alt="Defect Full View"
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

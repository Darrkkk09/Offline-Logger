import React, { useState } from "react";
import { PhotoInput } from "./PhotoInput";
import { compressImage } from "../utils/imageCompression";
import { generateUUID } from "../utils/uuid";
import { saveTicket } from "../db/database";
import { SYNC_STATUS } from "../types/ticket";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { AlertCircle, CheckCircle2, PlusCircle, Wrench, MapPin, Cpu } from "lucide-react";

const QUICK_STATIONS = ["ST-001", "ST-012", "ST-042", "ST-108"];

/**
 * Main Issue Reporting Form component for floor engineers
 * 
 * @param {Object} props
 * @param {Function} props.onTicketSaved - Callback after ticket is written to Dexie
 */
export function IssueForm({ onTicketSaved }) {
  const isOnline = useNetworkStatus();

  const [stationId, setStationId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [description, setDescription] = useState("");
  const [photoBlob, setPhotoBlob] = useState(null);

  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handlePhotoSelect(file) {
    try {
      setIsCompressing(true);
      setError("");
      const compressed = await compressImage(file);
      setPhotoBlob(compressed);
    } catch (err) {
      console.error("Image compression error:", err);
      setError("Failed to compress image file. Please try again.");
    } finally {
      setIsCompressing(false);
    }
  }

  function handlePhotoRemove() {
    setPhotoBlob(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    // Field validation
    if (!stationId.trim()) {
      setError("Station ID is required (e.g. ST-042)");
      return;
    }

    if (!serialNumber.trim()) {
      setError("Serial Number is required (e.g. SN-928371)");
      return;
    }

    if (!description.trim()) {
      setError("Defect description is required");
      return;
    }

    try {
      setIsSubmitting(true);

      const clientTicketId = generateUUID();

      const ticket = {
        client_ticket_id: clientTicketId,
        station_id: stationId.trim().toUpperCase(),
        serial_number: serialNumber.trim().toUpperCase(),
        description: description.trim(),
        photo: photoBlob || undefined,
        created_at: new Date().toISOString(),
        sync_status: SYNC_STATUS.PENDING,
        retry_count: 0
      };

      // Write directly to IndexedDB
      await saveTicket(ticket);

      // Reset form fields
      setStationId("");
      setSerialNumber("");
      setDescription("");
      setPhotoBlob(null);

      setSuccessMessage(
        isOnline
          ? "Issue saved locally & queued for sync!"
          : "Issue saved securely on device storage!"
      );

      if (onTicketSaved) {
        onTicketSaved(ticket);
      }

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (err) {
      console.error("Error saving ticket:", err);
      setError("Failed to save ticket to local device storage.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Wrench className="w-5 h-5 text-slate-700" />
            <h2>Report an Issue</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Capture defect details while fresh. Saved locally first, synced automatically when connected.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3.5 rounded-xl flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs p-3.5 rounded-xl flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Station ID with Quick Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Station ID <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-400 font-medium mr-1">Quick Select:</span>
              {QUICK_STATIONS.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStationId(st)}
                  className="text-[10px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded border border-slate-200 transition-colors cursor-pointer"
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              placeholder="e.g. ST-042"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 font-medium text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all uppercase font-mono"
              required
            />
          </div>
        </div>

        {/* Serial Number Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Serial Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Cpu className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="Scan or enter serial number (e.g. SN-928371)"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 font-medium text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all uppercase font-mono"
              required
            />
          </div>
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Defect Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Describe the defect, alignment error, noise or issue..."
            className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 font-medium text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all"
            required
          />
        </div>

        {/* Photo Upload Attachment */}
        <PhotoInput
          photoBlob={photoBlob}
          onPhotoSelect={handlePhotoSelect}
          onPhotoRemove={handlePhotoRemove}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isCompressing}
          className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold py-3.5 px-5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.99] cursor-pointer"
        >
          {isSubmitting ? (
            <span>Saving to Storage...</span>
          ) : isCompressing ? (
            <span>Compressing Photo...</span>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              <span>{isOnline ? "Save & Queue Issue" : "Save Issue (Offline)"}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

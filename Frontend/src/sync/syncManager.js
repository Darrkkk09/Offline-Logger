import { getPendingTickets, saveTicket } from "../db/database.js";
import { syncTickets } from "../services/api.js";
import { SYNC_STATUS } from "../types/ticket.js";

/**
 * Sync Manager handles batching and synchronizing local offline tickets with backend FastAPI server.
 * 
 * Flow:
 * 1. Get pending/failed tickets from IndexedDB
 * 2. Send batch payload to POST /api/tickets/sync
 * 3. Update local IndexedDB ticket statuses based on server item-level response
 */
export async function triggerSync() {
  console.log("[SyncManager] Sync triggered...");

  // 1. Fetch pending & failed tickets from local storage
  const pendingTickets = await getPendingTickets();

  if (pendingTickets.length === 0) {
    console.log("[SyncManager] No pending tickets to sync.");
    return { syncedCount: 0, pendingCount: 0 };
  }

  console.log(`[SyncManager] Found ${pendingTickets.length} pending ticket(s). Sending to FastAPI...`);

  // Bounded batch size matching backend MAX_BATCH_SIZE limit (500)
  const batch = pendingTickets.slice(0, 500);

  try {
    // 2. Send batch to API
    const response = await syncTickets(batch);
    const results = response.results || [];

    let syncedCount = 0;

    // 3. Process item-level results and update IndexedDB local records
    for (const item of results) {
      const localTicket = batch.find((t) => t.client_ticket_id === item.client_ticket_id);
      if (!localTicket) continue;

      if (item.status === "synced" || item.status === "already_synced") {
        localTicket.sync_status = SYNC_STATUS.SYNCED;
        localTicket.last_sync_attempt = new Date().toISOString();
        localTicket.sync_error = undefined;
        syncedCount++;
      } else if (item.status === "failed") {
        localTicket.sync_status = SYNC_STATUS.FAILED;
        localTicket.retry_count = (localTicket.retry_count || 0) + 1;
        localTicket.sync_error = item.error || "Sync failed";
        localTicket.last_sync_attempt = new Date().toISOString();
      }

      await saveTicket(localTicket);
    }

    console.log(`[SyncManager] Sync batch complete. Synced: ${syncedCount}, Remaining: ${pendingTickets.length - syncedCount}`);

    return {
      syncedCount,
      pendingCount: pendingTickets.length - syncedCount
    };
  } catch (error) {
    console.error("[SyncManager] Sync failed with error:", error);

    // Mark batch tickets as failed with error details
    for (const ticket of batch) {
      ticket.sync_status = SYNC_STATUS.FAILED;
      ticket.retry_count = (ticket.retry_count || 0) + 1;
      ticket.sync_error = error.message;
      ticket.last_sync_attempt = new Date().toISOString();
      await saveTicket(ticket);
    }

    throw error;
  }
}

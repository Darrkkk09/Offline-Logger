import Dexie from "dexie";

// Initialize Dexie database for local offline ticket storage
export const db = new Dexie("OfflineIssueLoggerDB");

// Define schema with indexed fields for fast querying
db.version(1).stores({
  // client_ticket_id is primary key
  // sync_status and created_at are indexed for filtering and sorting
  tickets: "client_ticket_id, sync_status, created_at"
});

/**
 * Save a new ticket or update an existing ticket in IndexedDB
 */
export async function saveTicket(ticket) {
  return await db.tickets.put(ticket);
}

/**
 * Get all tickets ordered by creation date (newest first)
 */
export async function getAllTickets() {
  return await db.tickets.orderBy("created_at").reverse().toArray();
}

/**
 * Get pending tickets that are waiting to sync with backend
 */
export async function getPendingTickets() {
  return await db.tickets
    .where("sync_status")
    .equals("pending")
    .toArray();
}

/**
 * Count total number of pending tickets
 */
export async function getPendingTicketsCount() {
  return await db.tickets
    .where("sync_status")
    .equals("pending")
    .count();
}

/**
 * Get failed tickets that need retry
 */
export async function getFailedTickets() {
  return await db.tickets
    .where("sync_status")
    .equals("failed")
    .toArray();
}

/**
 * Delete a ticket by ID
 */
export async function deleteTicket(clientTicketId) {
  return await db.tickets.delete(clientTicketId);
}

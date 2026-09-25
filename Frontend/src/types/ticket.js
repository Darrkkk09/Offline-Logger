/**
 * @typedef {"pending" | "syncing" | "synced" | "failed"} SyncStatus
 */

/**
 * @typedef {Object} OfflineTicket
 * @property {string} client_ticket_id - Unique UUID generated on the client
 * @property {string} station_id - Factory station identifier (e.g. ST-001)
 * @property {string} serial_number - Equipment serial number
 * @property {string} description - Detailed defect description
 * @property {Blob} [photo] - Compressed image binary blob stored in IndexedDB
 * @property {string} created_at - ISO 8601 creation timestamp
 * @property {SyncStatus} sync_status - Current synchronization status
 * @property {number} retry_count - Number of backend sync retry attempts
 * @property {string} [sync_error] - Last recorded synchronization error message
 * @property {string} [last_sync_attempt] - ISO 8601 timestamp of last sync attempt
 */

export const SYNC_STATUS = {
  PENDING: "pending",
  SYNCING: "syncing",
  SYNCED: "synced",
  FAILED: "failed",
};

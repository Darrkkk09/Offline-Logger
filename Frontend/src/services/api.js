/**
 * API Service for communicating with backend FastAPI server.
 * Uses native fetch API without complex HTTP wrappers.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://offline-logger.onrender.com/api";

/**
 * Sends a batch of offline tickets to backend FastAPI endpoint (/api/tickets/sync).
 * 
 * @param {Array<import('../types/ticket').OfflineTicket>} tickets 
 * @returns {Promise<{results: Array<{client_ticket_id: string, status: string, server_id?: string, error?: string}>}>}
 */
export async function syncTickets(tickets) {
  if (!tickets || tickets.length === 0) {
    return { results: [] };
  }

  // Format tickets payload matching FastAPI SyncRequest schema
  const payload = {
    tickets: tickets.map((t) => ({
      client_ticket_id: t.client_ticket_id,
      station_id: t.station_id,
      serial_number: t.serial_number,
      description: t.description,
      created_at: t.created_at,
      photo_url: t.photo_url || null
    }))
  };

  const response = await fetch(`${API_BASE_URL}/tickets/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server error (${response.status})`);
  }

  return await response.json();
}

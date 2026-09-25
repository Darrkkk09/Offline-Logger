from services.ticket_service import TicketService

MAX_BATCH_SIZE = 500

class SyncService:
    @staticmethod
    async def process_batch_sync(tickets: list[dict]) -> dict:
        """
        Processes a batch of offline tickets sent from frontend PWA.
        
        Enforces:
        - Max batch size limit (500)
        - Idempotency per ticket (unique client_ticket_id)
        - Per-item status result reporting ('synced', 'already_synced', 'failed')
        """
        if len(tickets) > MAX_BATCH_SIZE:
            raise ValueError(f"Batch size exceeds maximum limit of {MAX_BATCH_SIZE} tickets.")

        results = []

        for ticket_data in tickets:
            client_id = ticket_data.get("client_ticket_id")

            # Validate basic ticket data
            if not client_id or not ticket_data.get("station_id") or not ticket_data.get("serial_number") or not ticket_data.get("description"):
                results.append({
                    "client_ticket_id": client_id or "unknown",
                    "status": "failed",
                    "error": "Missing required ticket fields (client_ticket_id, station_id, serial_number, description)"
                })
                continue

            try:
                ticket_doc, already_exists = await TicketService.create_ticket(ticket_data)

                if already_exists:
                    results.append({
                        "client_ticket_id": client_id,
                        "status": "already_synced",
                        "server_id": ticket_doc["id"]
                    })
                else:
                    results.append({
                        "client_ticket_id": client_id,
                        "status": "synced",
                        "server_id": ticket_doc["id"]
                    })
            except Exception as err:
                results.append({
                    "client_ticket_id": client_id,
                    "status": "failed",
                    "error": str(err)
                })

        return {"results": results}

from datetime import datetime, timezone
from bson import ObjectId
from pymongo.errors import DuplicateKeyError
from utils.database import get_tickets_collection

def format_ticket_doc(doc: dict) -> dict:
    """
    Converts MongoDB document format (_id as ObjectId) into API schema response dict.
    """
    if not doc:
        return doc
    return {
        "id": str(doc["_id"]),
        "client_ticket_id": doc.get("client_ticket_id", ""),
        "station_id": doc.get("station_id", ""),
        "serial_number": doc.get("serial_number", ""),
        "description": doc.get("description", ""),
        "photo_url": doc.get("photo_url"),
        "created_at": doc.get("created_at", ""),
        "synced_at": doc.get("synced_at", "")
    }

class TicketService:
    @staticmethod
    async def create_ticket(ticket_data: dict) -> tuple[dict, bool]:
        """
        Creates a single ticket in MongoDB.
        Returns (formatted_ticket_dict, is_already_exists).
        Guarantees idempotency by checking client_ticket_id and handling DuplicateKeyError.
        """
        collection = get_tickets_collection()
        client_ticket_id = ticket_data["client_ticket_id"]

        # 1. Check if client_ticket_id already exists in MongoDB
        existing_doc = await collection.find_one({"client_ticket_id": client_ticket_id})
        if existing_doc:
            return format_ticket_doc(existing_doc), True

        now_iso = datetime.now(timezone.utc).isoformat()
        doc = {
            "client_ticket_id": client_ticket_id,
            "station_id": ticket_data["station_id"],
            "serial_number": ticket_data["serial_number"],
            "description": ticket_data["description"],
            "photo_url": ticket_data.get("photo_url"),
            "created_at": ticket_data["created_at"],
            "synced_at": now_iso
        }

        # 2. Insert document; catch race conditions using MongoDB UNIQUE index
        try:
            result = await collection.insert_one(doc)
            doc["_id"] = result.inserted_id
            return format_ticket_doc(doc), False
        except DuplicateKeyError:
            existing_doc = await collection.find_one({"client_ticket_id": client_ticket_id})
            return format_ticket_doc(existing_doc), True

    @staticmethod
    async def get_tickets(station_id: str | None = None, page: int = 1, limit: int = 50) -> list[dict]:
        """
        Fetches paginated tickets sorted by created_at descending.
        """
        collection = get_tickets_collection()

        # Enforce page and limit constraints
        page = max(1, page)
        limit = min(max(1, limit), 100) # Default 50, Max 100
        skip = (page - 1) * limit

        query = {}
        if station_id:
            query["station_id"] = station_id

        cursor = collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
        docs = await cursor.to_list(length=limit)

        return [format_ticket_doc(doc) for doc in docs]

    @staticmethod
    async def get_ticket_by_id(ticket_id: str) -> dict | None:
        """
        Fetches a ticket by MongoDB ObjectId or client_ticket_id.
        """
        collection = get_tickets_collection()

        doc = None
        # First try parsing as MongoDB ObjectId
        if ObjectId.is_valid(ticket_id):
            doc = await collection.find_one({"_id": ObjectId(ticket_id)})

        # If not found by ObjectId, fallback to querying by client_ticket_id
        if not doc:
            doc = await collection.find_one({"client_ticket_id": ticket_id})

        if not doc:
            return None

        return format_ticket_doc(doc)

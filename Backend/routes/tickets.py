from fastapi import APIRouter, Query, status
from schemas.ticket import TicketCreate, TicketResponse, SyncRequest, SyncResponse
from controllers.ticket_controller import TicketController
from controllers.sync_controller import SyncController

router = APIRouter()

@router.post("/tickets", response_model=TicketResponse, status_code=status.HTTP_201_CREATED)
async def create_ticket(ticket: TicketCreate):
    """
    Create a single ticket online.
    """
    return await TicketController.create_ticket(ticket)

@router.get("/tickets", response_model=list[TicketResponse])
async def get_tickets(
    station_id: str | None = Query(None, description="Optional station filter"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Items per page (max 100)")
):
    """
    Fetch paginated tickets sorted by creation time descending.
    """
    return await TicketController.get_tickets(station_id=station_id, page=page, limit=limit)

@router.post("/tickets/sync", response_model=SyncResponse)
async def sync_tickets(sync_req: SyncRequest):
    """
    Batch synchronize offline tickets collected from IndexedDB.
    Guarantees idempotency via unique client_ticket_id index.
    """
    return await SyncController.process_sync(sync_req)

@router.get("/tickets/{ticket_id}", response_model=TicketResponse)
async def get_ticket_by_id(ticket_id: str):
    """
    Fetch a single ticket by MongoDB ObjectId or client UUID.
    """
    return await TicketController.get_ticket_by_id(ticket_id)

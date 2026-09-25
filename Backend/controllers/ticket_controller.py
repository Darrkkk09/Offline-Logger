from fastapi import HTTPException, status
from schemas.ticket import TicketCreate, TicketResponse
from services.ticket_service import TicketService

class TicketController:
    @staticmethod
    async def create_ticket(ticket_in: TicketCreate) -> TicketResponse:
        """
        Processes creation of a single online ticket.
        """
        ticket_dict = ticket_in.model_dump()
        ticket_doc, already_exists = await TicketService.create_ticket(ticket_dict)
        
        # Whether new or already stored, return the formatted ticket
        return TicketResponse(**ticket_doc)

    @staticmethod
    async def get_tickets(station_id: str | None = None, page: int = 1, limit: int = 50) -> list[TicketResponse]:
        """
        Processes paginated ticket fetching request.
        """
        tickets = await TicketService.get_tickets(station_id=station_id, page=page, limit=limit)
        return [TicketResponse(**t) for t in tickets]

    @staticmethod
    async def get_ticket_by_id(ticket_id: str) -> TicketResponse:
        """
        Processes fetching a single ticket by server ID or client UUID.
        """
        ticket = await TicketService.get_ticket_by_id(ticket_id)
        if not ticket:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Ticket with ID '{ticket_id}' not found."
            )
        return TicketResponse(**ticket)

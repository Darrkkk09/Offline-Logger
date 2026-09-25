from fastapi import HTTPException, status
from schemas.ticket import SyncRequest, SyncResponse
from services.sync_service import SyncService

class SyncController:
    @staticmethod
    async def process_sync(sync_req: SyncRequest) -> SyncResponse:
        """
        Processes batch synchronization of offline tickets sent from frontend.
        """
        tickets_list = [ticket.model_dump() for ticket in sync_req.tickets]

        try:
            result = await SyncService.process_batch_sync(tickets_list)
            return SyncResponse(**result)
        except ValueError as val_err:
            raise HTTPException(
                status_code=status.HTTP_413_CONTENT_TOO_LARGE,
                detail=str(val_err)
            )
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Batch sync failed: {str(err)}"
            )

from fastapi import APIRouter
from utils.database import get_database

router = APIRouter()

@router.get("/health")
async def health_check():
    """
    Health check endpoint.
    Verifies API status and MongoDB connection reachability.
    """
    db_status = "connected"
    try:
        db = get_database()
        # Simple ping command to verify MongoDB reachability
        await db.command("ping")
    except Exception as err:
        db_status = f"unreachable ({str(err)})"

    return {
        "status": "ok",
        "database": db_status
    }

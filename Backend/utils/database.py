import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "offline_issue_logger")

# Singleton Mongo client instance
_client: AsyncIOMotorClient | None = None

def get_mongo_client() -> AsyncIOMotorClient:
    """
    Returns or creates a reusable AsyncIOMotorClient instance.
    """
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(MONGODB_URL)
    return _client

def get_database():
    """
    Returns the MongoDB database reference.
    """
    client = get_mongo_client()
    return client[DATABASE_NAME]

def get_tickets_collection():
    """
    Returns the tickets collection reference.
    """
    db = get_database()
    return db["tickets"]

async def init_db_indexes():
    """
    Creates essential MongoDB indexes on application startup:
    1. UNIQUE index on client_ticket_id (guarantees idempotency)
    2. Index on station_id (for station filtering)
    3. Index on created_at (for sorting and paginating tickets)
    """
    collection = get_tickets_collection()

    # Unique index on client_ticket_id to enforce idempotency at the database level
    await collection.create_index("client_ticket_id", unique=True)

    # Secondary indexes for query performance
    await collection.create_index("station_id")
    await collection.create_index("created_at")

async def close_mongo_connection():
    """
    Closes the global MongoDB client connection on shutdown.
    """
    global _client
    if _client is not None:
        _client.close()
        _client = None

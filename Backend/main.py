import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import health, tickets
from utils.database import init_db_indexes, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Initializes database indexes on startup and closes client connections on shutdown.
    """
    # Startup: Ensure MongoDB unique index on client_ticket_id
    try:
        await init_db_indexes()
        print("[MongoDB] Indexes initialized successfully.")
    except Exception as err:
        print(f"[MongoDB Warning] Index initialization error: {err}")

    yield

    # Shutdown: Close DB connection pool
    await close_mongo_connection()
    print("[MongoDB] Connection closed.")

app = FastAPI(
    title="Offline Issue Logger API",
    description="Backend service for factory defect ticket management and offline sync.",
    version="0.1.0",
    lifespan=lifespan
)

# Enable CORS for frontend PWA integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
@app.head("/")
async def root():
    """Root endpoint for Render health checks and API discovery"""
    return {
        "status": "ok",
        "service": "Offline Issue Logger API",
        "docs": "/docs",
        "health": "/api/health"
    }

# Include API routes
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(tickets.router, prefix="/api", tags=["Tickets"])

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)

# FloorLog — Offline Issue Logger for the Floor

**FloorLog** is an offline-first mobile Progressive Web App (PWA) and FastAPI backend system designed for factory floor engineers to report defect issues when network connectivity is spotty or unavailable.

Network drops on a production floor are normal. FloorLog captures station IDs, equipment serial numbers, defect descriptions, and compressed photos locally on the device in IndexedDB, then automatically synchronizes structured tickets to MongoDB as soon as network connectivity is restored.

---

## Key Capabilities

* **Offline-First Storage**: Tickets written directly to local device storage via IndexedDB before any server transmission.
* **On-Device Photo Compression**: Defect photos captured via camera are resized and compressed directly on the browser HTML5 Canvas into binary Blob objects stored locally.
* **Automatic Online Synchronization**: Real-time browser network status listeners automatically trigger batch synchronization as soon as connection is restored.
* **Idempotent Batch Sync**: Unique client-generated ticket IDs and database indexes guarantee zero duplicate tickets even if retries occur during network drops.
* **2-Part Product UI**:
  * **Product Landing Page (`/`)**: High-polish product marketing page with visual architecture diagrams, 4-step execution workflow, and interactive mockup.
  * **Floor Logger Application (`/app`)**: Operational defect entry form, status metrics bar, search/filter queue, and uncropped image inspection modal.

---

## Tech Stack

### Frontend
* **React (Pure JavaScript/JSX)**
* **Vite**
* **Tailwind CSS**
* **Dexie.js (IndexedDB wrapper)**
* **Lucide React Icons**
* **Vite PWA Plugin (Service Worker asset caching)**

### Backend
* **Python 3.11+**
* **FastAPI**
* **Motor (PyMongo Async Driver)**
* **MongoDB**
* **Pydantic v2**
* **Uvicorn**

---

## Project Structure

```text
Offline-Logger/
├── Backend/
│   ├── controllers/
│   │   ├── sync_controller.py      # Request handler for batch synchronization
│   │   └── ticket_controller.py    # Request handler for single ticket operations
│   ├── routes/
│   │   ├── health.py               # Health check & MongoDB ping endpoint
│   │   └── tickets.py              # API endpoint routes (/api/tickets)
│   ├── schemas/
│   │   └── ticket.py               # Pydantic validation schemas
│   ├── services/
│   │   ├── sync_service.py         # Batch processing & limit enforcement logic
│   │   └── ticket_service.py       # Persistence & pagination logic
│   ├── utils/
│   │   └── database.py             # Motor AsyncIOMotorClient setup & index initialization
│   ├── .env.example                # Environment template
│   ├── main.py                     # FastAPI entrypoint
│   └── requirements.txt            # Python dependencies
│
├── Frontend/
│   ├── public/
│   │   ├── icons/                  # PWA app icons
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/             # Reusable UI components (Header, IssueForm, TicketCard, etc.)
│   │   ├── pages/                  # LandingPage (/) and Dashboard (/app)
│   │   ├── db/                     # Dexie.js database setup
│   │   ├── sync/                   # SyncManager logic
│   │   ├── services/               # Fetch API integration
│   │   └── App.jsx                 # View router
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js              # Vite & PWA plugin configuration
│   └── README.md
│
└── README.md
```

---

## Getting Started

### 1. Backend Setup (FastAPI + MongoDB)

```bash
cd Backend

# Install Python dependencies
pip install -r requirements.txt

# Create local environment configuration (.env)
cp .env.example .env

# Start FastAPI server
python -m uvicorn main:app --reload --port 8000
```

The backend API will run at `http://localhost:8000/api`.

### 2. Frontend Setup (React PWA)

```bash
cd Frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Production Build

To build the frontend PWA for production deployment:

```bash
cd Frontend
npm run build
```

This compiles optimized assets and generates Service Worker caching files (`dist/sw.js` and `dist/workbox-*.js`).

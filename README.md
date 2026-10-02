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

## 🧪 Automated Tests

Run the backend test suite with `pytest`:

```bash
cd Backend
pytest
```

---

## 🗄️ Database & Storage Schema

### 1. Client-Side Schema (IndexedDB / Dexie.js)
Stores tickets locally when offline:
```javascript
tickets: 'id, client_ticket_id, title, priority, sync_status, created_at'
```

### 2. Server-Side Schema (MongoDB Collection: `tickets`)
```json
{
  "_id": "ObjectId",
  "client_ticket_id": "UUID v4 (UNIQUE INDEX)",
  "title": "String (1-100 chars)",
  "description": "String (1-1000 chars)",
  "priority": "Enum ['Low', 'Medium', 'High', 'Critical']",
  "status": "Enum ['OPEN', 'IN_PROGRESS', 'RESOLVED']",
  "image_base64": "String (Data URI, optional)",
  "created_at": "ISO DateTime",
  "synced_at": "ISO DateTime"
}
```

---

## 💡 Assumptions & Design Decisions

1. **Idempotency via Client UUIDs**: Tickets generate a client-side UUID v4 before saving. MongoDB enforces a `UNIQUE` index on `client_ticket_id` so network reconnect retries can never create duplicate tickets.
2. **Canvas Photo Compression**: Camera captures are compressed to client-side JPEG/WebP Blobs before storing in IndexedDB to preserve device memory and speed up sync payload transmission.
3. **Optimistic Offline Writes**: Operators get instant 0ms UI confirmation when reporting defects without waiting for network ACK.
4. **Batch Sync API**: Pending tickets are flushed in a single POST `/api/sync/batch` request upon network recovery for bandwidth efficiency.

---

## 🤖 AI-Tool Usage Declaration

* **Tools Used**: Google Gemini (AI Coding Assistant).
* **Usage**: Used for initial code generation, assisting with Service Worker PWA setup, writing FastAPI async endpoints, establishing Dexie IndexedDB schemas, styling with Tailwind CSS, and writing unit tests. No autonomous coding agents were used.
* **Originality**: All architecture design, code integration, logic review, and walkthrough comprehension are fully owned and understood by the participant.

---

## 📽️ Video & Live Demo

* **Live API Backend**: `https://offline-logger.onrender.com/api`
* **GitHub Repository**: `https://github.com/Darrkkk09/Offline-Logger`
* **Demo Video**: *(Add your 3-5 minute demo video link here)*

---

## Production Build

To build the frontend PWA for production deployment:

```bash
cd Frontend
npm run build
```

This compiles optimized assets and generates Service Worker caching files (`dist/sw.js` and `dist/workbox-*.js`).


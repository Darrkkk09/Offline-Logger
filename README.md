# Offline Issue Logger for the Floor

An offline-first mobile PWA system designed for factory engineers to report floor defects when internet connectivity is spotty or unavailable.

## Project Structure

```text
offline-issue-logger/
│
├── frontend/                # Offline-first React PWA
│   ├── public/
│   │   ├── icons/
│   │   │   ├── icon-192.png
│   │   │   └── icon-512.png
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.svg
│   │   │
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── NetworkStatus.jsx
│   │   │   ├── IssueForm.jsx
│   │   │   ├── PhotoInput.jsx
│   │   │   ├── PendingQueue.jsx
│   │   │   ├── TicketCard.jsx
│   │   │   └── SyncStatus.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── db/
│   │   │   └── database.js
│   │   │
│   │   ├── sync/
│   │   │   └── syncManager.js
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── utils/
│   │   │   ├── imageCompression.js
│   │   │   └── uuid.js
│   │   │
│   │   ├── hooks/
│   │   │   └── useNetworkStatus.js
│   │   │
│   │   ├── types/
│   │   │   └── ticket.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   ├── jsconfig.json
│   ├── vite.config.js
│   └── README.md
│
├── app/                     # FastAPI Backend (Phase 2)
│   ├── routes/
│   │   ├── tickets.py
│   │   └── health.py
│   │
│   ├── controllers/
│   │   ├── ticket_controller.py
│   │   └── sync_controller.py
│   │
│   ├── services/
│   │   ├── ticket_service.py
│   │   ├── sync_service.py
│   │   └── storage_service.py
│   │
│   ├── schemas/
│   │   └── ticket.py
│   │
│   ├── utils/
│   │   └── database.py
│   │
│   └── main.py
│
├── tests/
│   ├── test_tickets.py
│   └── test_sync.py
│
├── .env
├── requirements.txt
└── README.md
```

## How Offline Storage Works

1. **Local-First Saves**: Tickets are written directly to **IndexedDB** via **Dexie.js** before any server transmission.
2. **On-Device Compression**: Camera photos are resized (max width 1280px) and compressed (JPEG quality 0.7) in browser memory using HTML5 Canvas before binary Blob storage.
3. **Queue & Status Tracking**: Each ticket maintains a `sync_status` (`pending`, `syncing`, `synced`, `failed`).
4. **PWA Offline Shell**: The frontend assets are cached by a Service Worker allowing offline startup.

## How to Run

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will launch at `http://localhost:3000`.

### Backend (Phase 2 Placeholder)

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

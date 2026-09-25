# Offline Issue Logger for the Floor — Frontend

An offline-first mobile Progressive Web App (PWA) designed for factory floor engineers to log defect tickets when network connectivity is spotty or unavailable.

## Tech Stack

* **React (Pure JavaScript/JSX)**
* **Vite**
* **Tailwind CSS**
* **Dexie.js (IndexedDB wrapper)**
* **Vite PWA Plugin (Service Worker asset caching)**

## Folder Structure

```text
frontend/
├── public/
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   │   └── logo.svg
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── NetworkStatus.jsx
│   │   ├── IssueForm.jsx
│   │   ├── PhotoInput.jsx
│   │   ├── PendingQueue.jsx
│   │   ├── TicketCard.jsx
│   │   └── SyncStatus.jsx
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── db/
│   │   └── database.js
│   │
│   ├── sync/
│   │   └── syncManager.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
│   │   ├── imageCompression.js
│   │   └── uuid.js
│   │
│   ├── hooks/
│   │   └── useNetworkStatus.js
│   │
│   ├── types/
│   │   └── ticket.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
├── jsconfig.json
├── vite.config.js
└── README.md
```

## How Offline Storage Works

1. **Local-First Writes**: When an engineer fills out a defect form on the floor, the ticket is immediately written to **IndexedDB** using **Dexie.js**.
2. **Compressed Attachments**: Defects photos captured via camera are compressed using browser HTML5 Canvas before being stored directly as binary `Blob` objects in IndexedDB.
3. **Network Independence**: The app monitors browser online/offline status using `navigator.onLine` and `window` event listeners. Tickets stay in `pending` status until background/manual synchronization is executed.
4. **App Shell PWA**: All application assets (JS, CSS, HTML, Icons) are cached locally via Service Worker, ensuring the UI opens even in airplane mode.

## How to Run

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To build for production:

```bash
npm run build
npm run preview
```

import React, { useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  WifiOff,
  Database,
  RefreshCw,
  Camera,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Layers,
  Smartphone,
  Cpu,
  MapPin,
  Menu,
  X,
  Activity,
  HardDriveUpload,
  AlertTriangle
} from "lucide-react";

/**
 * High-polish SaaS Landing Page for FloorLog
 * 
 * @param {Object} props
 * @param {Function} props.onNavigateToApp - Handler to open Floor Logger (/app)
 */
export function LandingPage({ onNavigateToApp }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function scrollToSection(id) {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. STICKY NAVIGATION HEADER */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base tracking-wider shadow-xs">
              FL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base tracking-tight leading-none">
                  FloorLog
                </span>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider border border-slate-200">
                  Floor Ops
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Offline Issue Logger
              </p>
            </div>
          </div>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button
              onClick={() => scrollToSection("product")}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection("workflow")}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Workflow
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Features
            </button>
          </nav>

          {/* Right Action CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onNavigateToApp}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Open Floor Logger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-md animate-in slide-in-from-top duration-200">
            <button
              onClick={() => scrollToSection("product")}
              className="block w-full text-left font-semibold text-slate-700 py-2 hover:text-slate-900"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection("workflow")}
              className="block w-full text-left font-semibold text-slate-700 py-2 hover:text-slate-900"
            >
              Workflow
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left font-semibold text-slate-700 py-2 hover:text-slate-900"
            >
              Features
            </button>
            <button
              onClick={onNavigateToApp}
              className="w-full bg-slate-900 text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow"
            >
              <span>Open Floor Logger</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                <span className="uppercase tracking-wider">Offline-First Factory Operations</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Capture issues. <br />
                <span className="text-slate-500">Keep production moving.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                FloorLog lets factory engineers report defects instantly — even when the floor has no reliable Wi-Fi or cellular connectivity.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onNavigateToApp}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Open Floor Logger</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection("workflow")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See How It Works</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Status Guarantee Pills */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-4 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  IndexedDB Local Storage
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  Auto Background Sync
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600" />
                  Zero Data Loss
                </span>
              </div>
            </div>

            {/* Right Hero Visual Mockup */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-md bg-slate-900 rounded-3xl p-4 shadow-2xl border border-slate-800">
                {/* Device Frame Top Bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[11px] font-mono text-slate-400 ml-2">FloorLog Terminal</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                    <WifiOff className="w-3 h-3" />
                    OFFLINE MODE
                  </span>
                </div>

                {/* Simulated UI Form Mockup */}
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3.5 text-left">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-slate-200">Report Defect Issue</span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                      Pending Sync: 2
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Station ID</span>
                      <span className="font-mono font-bold text-slate-100">ST-042</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Serial Number</span>
                      <span className="font-mono font-bold text-slate-100">SN-928371</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Description</span>
                    <p className="text-slate-300 text-[11px]">Loose connector found on main hydraulic pump housing.</p>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Camera className="w-4 h-4 text-blue-400" />
                      <span className="text-[11px]">defect_photo_1042.jpg</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Compressed Blob</span>
                  </div>

                  <div className="bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-center text-xs flex items-center justify-center gap-2 shadow">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save Issue (Saved to IndexedDB)</span>
                  </div>
                </div>

                {/* Status Callout Overlays */}
                <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 shadow-lg flex items-center gap-2 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Saved Locally ✓</span>
                </div>

                <div className="absolute -top-3 -right-4 bg-white text-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 shadow-lg flex items-center gap-2 text-xs font-bold">
                  <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
                  <span>Waiting to Sync ↻</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section id="product" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              The Challenge
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The factory floor doesn't always have a connection. <br className="hidden sm:inline" />
              Your workflow shouldn't depend on one.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Traditional cloud-only software breaks down on industrial floors. FloorLog resolves the 3 biggest defect reporting failure points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <WifiOff className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Unreliable Connectivity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Factory floors are filled with metal structures and dead zones where Wi-Fi and cellular signals drop frequently.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Delayed Reporting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When apps crash offline, engineers postpone recording defects until the end of their shift, halting immediate resolution.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Lost Context & Evidence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When issues are logged hours later, critical serial numbers, photo evidence, and exact timestamps are forgotten or lost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOLUTION SECTION */}
      <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              The Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built for the moments when the network isn't.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              FloorLog implements a resilient offline-first architecture that prioritizes immediate local storage before server transmission.
            </p>
          </div>

          {/* Horizontal Flow Diagram (Desktop) / Vertical (Mobile) */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 text-center items-center">
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <Smartphone className="w-6 h-6 text-blue-400 mx-auto" />
                <span className="block text-xs font-bold text-slate-200">1. Capture Issue</span>
              </div>
              <div className="hidden md:block text-slate-500 font-bold text-xl">→</div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <Database className="w-6 h-6 text-emerald-400 mx-auto" />
                <span className="block text-xs font-bold text-slate-200">2. Save Locally</span>
              </div>
              <div className="hidden md:block text-slate-500 font-bold text-xl">→</div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <RefreshCw className="w-6 h-6 text-amber-400 mx-auto" />
                <span className="block text-xs font-bold text-slate-200">3. Reconnect</span>
              </div>
              <div className="hidden md:block text-slate-500 font-bold text-xl">→</div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <HardDriveUpload className="w-6 h-6 text-indigo-400 mx-auto" />
                <span className="block text-xs font-bold text-slate-200">4. Auto Sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORKFLOW SECTION */}
      <section id="workflow" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              4-Step Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From defect to database. Without stopping the line.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 relative">
              <span className="text-3xl font-extrabold text-slate-300 font-mono">01</span>
              <h3 className="text-base font-bold text-slate-900">Capture Defect</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Engineer inputs Station ID, Serial Number, defect description, and attaches a compressed photo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 relative">
              <span className="text-3xl font-extrabold text-slate-300 font-mono">02</span>
              <h3 className="text-base font-bold text-slate-900">Store Offline</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The ticket is written directly to IndexedDB via Dexie.js with a unique client UUID.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 relative">
              <span className="text-3xl font-extrabold text-slate-300 font-mono">03</span>
              <h3 className="text-base font-bold text-slate-900">Auto Reconnect</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When network connectivity returns, browser event hooks detect online status automatically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 relative">
              <span className="text-3xl font-extrabold text-slate-300 font-mono">04</span>
              <h3 className="text-base font-bold text-slate-900">Sync to Backend</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pending tickets are sent in bounded batches to FastAPI and stored permanently in MongoDB.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. KEY FEATURES SECTION */}
      <section id="features" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Product Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Designed around real factory-floor constraints.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="p-2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <WifiOff className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Offline First</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Capture issues instantly without needing an active internet connection.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="p-2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Automatic Sync</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pending tickets sync automatically with FastAPI as soon as connection returns.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="p-2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Local Persistence</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tickets survive page refreshes, tab closures, and device restarts.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="p-2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Photo Evidence</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Attach canvas-compressed defect photos directly stored as Blobs in IndexedDB.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="p-2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Batch Processing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bounded sync payloads (max 500) prevent memory spikes on rugged devices.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="p-2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Duplicate Protection</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Client-generated UUIDs and MongoDB UNIQUE index guarantee idempotency.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="p-2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Installable PWA</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Service Worker caches app shell for full standalone offline startup.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="p-2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Touch Friendly UI</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Large inputs and touch targets built for factory floor tablets and phones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY IT MATTERS SECTION */}
      <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Reliable reporting shouldn't depend on reliable Wi-Fi.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Lost Reports</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Issues are captured immediately at the moment of discovery, eliminating forgotten details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Less Downtime</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Engineers don't need to leave their station or hunt for Wi-Fi to submit defect records.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Reliable Server Data</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Central MongoDB database receives structured tickets automatically with full audit trail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-slate-900 text-white rounded-3xl p-10 sm:p-16 shadow-2xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to capture your first issue?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Start reporting factory floor defects immediately without waiting for network connection.
            </p>
            <div className="pt-2">
              <button
                onClick={onNavigateToApp}
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-8 py-4 rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Open Floor Logger</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white text-slate-900 flex items-center justify-center font-bold text-xs">
              FL
            </div>
            <div>
              <span className="font-bold text-slate-200">FloorLog</span>
              <p className="text-[11px] text-slate-500">Offline Issue Logger for Factory Floor Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <button onClick={() => scrollToSection("product")} className="hover:text-white transition-colors cursor-pointer">
              Product
            </button>
            <button onClick={() => scrollToSection("workflow")} className="hover:text-white transition-colors cursor-pointer">
              Workflow
            </button>
            <button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors cursor-pointer">
              Features
            </button>
            <button onClick={onNavigateToApp} className="text-white font-bold hover:underline cursor-pointer">
              Open App →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

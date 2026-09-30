import React, { useState, useEffect, useMemo, useRef } from 'react';

// Self-contained, clean Lucide style icons
const Icon = ({ name, size = 18, className = "" }) => {
  const icons = {
    printer: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
      </svg>
    ),
    upload: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
    ),
    fileText: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    checkCircle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
    clock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    layers: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
    sparkles: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
      </svg>
    ),
    arrowRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    ),
    cpu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
      </svg>
    ),
    barChart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
      </svg>
    ),
    play: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    ),
    refresh: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
      </svg>
    ),
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    dollarSign: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    trash: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    ),
    info: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    )
  };
  return icons[name] || icons.info;
};

const INITIAL_JOBS = [
  {
    id: "SP-001",
    docName: "Notes.pdf",
    user: "Student 01",
    pages: 10,
    copies: 2,
    mode: "B&W",
    sides: "Double-sided",
    paperSize: "A4",
    cost: 20,
    queuePos: 1,
    status: "Printing",
    timestamp: "09:15 AM",
    step: 4
  },
  {
    id: "SP-002",
    docName: "Assignment.pdf",
    user: "Student 02",
    pages: 25,
    copies: 1,
    mode: "Colour",
    sides: "Single-sided",
    paperSize: "A4",
    cost: 175,
    queuePos: 2,
    status: "Waiting",
    timestamp: "09:20 AM",
    step: 3
  },
  {
    id: "SP-003",
    docName: "Microprocessor_Lab_Manual.pdf",
    user: "Rahul Sharma (CS21B04)",
    pages: 16,
    copies: 1,
    mode: "B&W",
    sides: "Double-sided",
    paperSize: "A4",
    cost: 16,
    queuePos: 3,
    status: "Waiting",
    timestamp: "09:22 AM",
    step: 3
  },
  {
    id: "SP-004",
    docName: "Robotics_Seminar_Report.pdf",
    user: "Aman Verma (ME22B19)",
    pages: 18,
    copies: 1,
    mode: "Colour",
    sides: "Double-sided",
    paperSize: "A4",
    cost: 90,
    queuePos: 4,
    status: "Waiting",
    timestamp: "09:25 AM",
    step: 3
  },
  {
    id: "SP-005",
    docName: "Campus_Placement_Resume.pdf",
    user: "Sneha Rao (EC21B11)",
    pages: 2,
    copies: 5,
    mode: "B&W",
    sides: "Single-sided",
    paperSize: "A4",
    cost: 15,
    queuePos: 5,
    status: "Waiting",
    timestamp: "09:27 AM",
    step: 3
  }
];

const INITIAL_DOCS = [
  { id: "DOC-101", name: "Notes.pdf", type: "PDF", pages: 10, uploadedAt: "09:14 AM", aiStatus: "Analysed", printStatus: "Printing", size: "1.2 MB" },
  { id: "DOC-102", name: "Assignment.pdf", type: "PDF", pages: 25, uploadedAt: "09:18 AM", aiStatus: "Analysed", printStatus: "In Queue", size: "3.4 MB" },
  { id: "DOC-103", name: "Microprocessor_Lab_Manual.pdf", type: "PDF", pages: 16, uploadedAt: "09:21 AM", aiStatus: "Analysed", printStatus: "In Queue", size: "2.1 MB" },
  { id: "DOC-104", name: "Robotics_Seminar_Report.docx", type: "DOCX", pages: 18, uploadedAt: "09:23 AM", aiStatus: "Analysed", printStatus: "In Queue", size: "1.8 MB" },
  { id: "DOC-105", name: "Event_Banner_Flyer.png", type: "PNG", pages: 1, uploadedAt: "08:50 AM", aiStatus: "Analysed", printStatus: "Completed", size: "4.5 MB" }
];

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('smartprint_view') || 'landing';
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('smartprint_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [docs, setDocs] = useState(() => {
    const saved = localStorage.getItem('smartprint_docs');
    return saved ? JSON.parse(saved) : INITIAL_DOCS;
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState("");
  const [aiResult, setAiResult] = useState({
    fileName: "example.pdf",
    fileType: "PDF",
    pages: 12,
    detectedContent: "Text Document",
    printReadiness: "Ready",
    confidence: 94,
    analysisText: "Document contains 12 printable pages with standard text content.",
    checks: [
      { text: "File valid", passed: true },
      { text: "Pages detected", passed: true },
      { text: "Print-ready", passed: true },
      { text: "No corruption detected", passed: true }
    ]
  });

  const [printConfig, setPrintConfig] = useState({
    copies: 2,
    mode: "bw",
    sides: "double",
    paperSize: "A4",
    pageRange: "all",
    customRangeText: "1-12"
  });

  const [activeUserJobId, setActiveUserJobId] = useState("SP-2026-00124");
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('smartprint_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('smartprint_docs', JSON.stringify(docs));
  }, [docs]);

  useEffect(() => {
    localStorage.setItem('smartprint_view', currentView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const calculatePrice = (pages, copies, mode, sides, size) => {
    let baseRatePerPage = 1.0;
    if (mode === "bw") {
      baseRatePerPage = sides === "single" ? 1.5 : 1.0;
    } else {
      baseRatePerPage = sides === "single" ? 7.0 : 5.0;
    }
    let sizeMultiplier = 1.0;
    if (size === "A3") sizeMultiplier = 1.8;
    if (size === "Letter") sizeMultiplier = 1.0;

    const effectivePages = printConfig.pageRange === "custom" ? 6 : pages;
    const total = Math.round(effectivePages * copies * baseRatePerPage * sizeMultiplier);
    return {
      total,
      baseRatePerPage,
      effectivePages,
      copies
    };
  };

  const currentPricing = useMemo(() => {
    return calculatePrice(
      aiResult.pages,
      printConfig.copies,
      printConfig.mode,
      printConfig.sides,
      printConfig.paperSize
    );
  }, [aiResult.pages, printConfig]);

  const runAiAnalysis = (fileInfo) => {
    setIsAnalyzing(true);
    setAnalysisStage("Uploading document...");
    setUploadProgress(30);

    setTimeout(() => {
      setUploadProgress(70);
      setAnalysisStage("Running AI document analysis...");
    }, 800);

    setTimeout(() => {
      setUploadProgress(95);
      setAnalysisStage("Preparing print configuration...");
    }, 1700);

    setTimeout(() => {
      setUploadProgress(100);
      setIsAnalyzing(false);

      const fileName = fileInfo ? fileInfo.name : "example.pdf";
      const ext = fileName.split('.').pop().toUpperCase();
      const pageNum = fileInfo && fileInfo.mockPages ? fileInfo.mockPages : 12;

      setAiResult({
        fileName: fileName,
        fileType: ext || "PDF",
        pages: pageNum,
        detectedContent: ext === "PNG" || ext === "JPG" ? "Graphic / Flyer" : "Text Document",
        printReadiness: "Ready",
        confidence: 94,
        analysisText: `Document contains ${pageNum} printable pages with standard text content.`,
        checks: [
          { text: "File valid", passed: true },
          { text: "Pages detected", passed: true },
          { text: "Print-ready", passed: true },
          { text: "No corruption detected", passed: true }
        ]
      });

      setCurrentView('ai_result');
    }, 2500);
  };

  const handleAddToQueue = () => {
    const newJobId = "SP-2026-00124";
    setActiveUserJobId(newJobId);

    const waitingCount = jobs.filter(j => j.status === "Waiting").length;
    const newPosition = waitingCount + 2;

    const newJob = {
      id: newJobId,
      docName: aiResult.fileName,
      user: "Student 04 (You)",
      pages: currentPricing.effectivePages,
      copies: printConfig.copies,
      mode: printConfig.mode === "bw" ? "B&W" : "Colour",
      sides: printConfig.sides === "single" ? "Single-sided" : "Double-sided",
      paperSize: printConfig.paperSize,
      cost: currentPricing.total,
      queuePos: newPosition,
      status: "Waiting",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      step: 3
    };

    setJobs(prev => [...prev.filter(j => j.id !== newJobId), newJob]);
    setCurrentView('queue_confirm');
    showToast(`Job ${newJobId} added to print queue successfully!`);
  };

  const handleProcessNextJob = () => {
    setJobs(prev => {
      let updated = [...prev];
      const printingIndex = updated.findIndex(j => j.status === "Printing");
      if (printingIndex !== -1) {
        updated[printingIndex] = {
          ...updated[printingIndex],
          status: "Completed",
          step: 5
        };
      }

      const waitingIndex = updated.findIndex(j => j.status === "Waiting");
      if (waitingIndex !== -1) {
        updated[waitingIndex] = {
          ...updated[waitingIndex],
          status: "Printing",
          queuePos: 1,
          step: 4
        };
        showToast(`Operator started printing: ${updated[waitingIndex].id} (${updated[waitingIndex].docName})`);
      } else {
        showToast("No more waiting jobs in queue! All active tasks completed.");
      }

      let currentPos = 2;
      updated = updated.map(j => {
        if (j.status === "Waiting") {
          const res = { ...j, queuePos: currentPos };
          currentPos++;
          return res;
        }
        return j;
      });

      return updated;
    });
  };

  const userJob = jobs.find(j => j.id === activeUserJobId) || {
    id: activeUserJobId,
    docName: aiResult.fileName,
    user: "Student 04 (You)",
    pages: aiResult.pages,
    copies: printConfig.copies,
    mode: printConfig.mode === "bw" ? "B&W" : "Colour",
    sides: printConfig.sides === "single" ? "Single-sided" : "Double-sided",
    paperSize: printConfig.paperSize,
    cost: currentPricing.total,
    queuePos: 4,
    status: "Waiting",
    timestamp: "Just now",
    step: 3
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
          <Icon name="checkCircle" size={20} className="text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Demo Toolbar */}
      <header className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-1.5 animate-pulse"></span>
              COLLEGE PROJECT DEMO MODE
            </span>
          </div>
          <div className="flex items-center flex-wrap gap-1.5 overflow-x-auto py-1">
            {['landing', 'upload', 'ai_result', 'print_settings', 'queue_confirm', 'track_job', 'admin_dashboard', 'better_tomorrow', 'architecture'].map((v) => (
              <button
                key={v}
                onClick={() => setCurrentView(v)}
                className={`px-2.5 py-1 rounded transition-colors capitalize ${currentView === v ? 'bg-indigo-600 text-white font-semibold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
              >
                {v.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-9 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Icon name="printer" size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">SmartPrint</span>
                <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-700">AI</span>
              </div>
              <p className="text-[10px] text-slate-500 -mt-0.5">Xerox & Queue Automation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('upload')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm shadow-indigo-300 transition-all flex items-center gap-1.5"
            >
              <Icon name="upload" size={16} />
              <span>Upload Doc</span>
            </button>
            <button
              onClick={() => setCurrentView('admin_dashboard')}
              className="px-3.5 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Icon name="users" size={16} />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Router */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {currentView === 'landing' && (
          <div className="text-center py-16 space-y-8">
            <h1 className="text-5xl font-extrabold text-slate-900">Smart Printing. <span className="text-indigo-600">Less Waiting.</span></h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">AI-powered document processing and intelligent print queue management for faster and more efficient Xerox services.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setCurrentView('upload')} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md">
                Upload Document
              </button>
              <button onClick={() => setCurrentView('admin_dashboard')} className="px-6 py-3 bg-white border border-slate-300 font-bold rounded-xl">
                Operator Dashboard
              </button>
            </div>
          </div>
        )}

        {currentView === 'upload' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Upload Document for AI Analysis</h2>
            <div 
              onClick={() => runAiAnalysis({ name: "Engineering_Mathematics_Unit3_Notes.pdf", mockPages: 12 })}
              className="border-2 border-dashed border-indigo-400 p-8 rounded-xl cursor-pointer bg-indigo-50/50 hover:bg-indigo-50 transition-colors"
            >
              <Icon name="upload" size={32} className="mx-auto text-indigo-600 mb-2" />
              <p className="font-semibold text-slate-800">Click to Select Sample College Notes (PDF)</p>
              <span className="text-xs text-slate-500">12 printable pages • 2.4 MB</span>
            </div>
            {isAnalyzing && (
              <div className="mt-4 p-4 bg-slate-100 rounded-xl font-mono text-xs text-indigo-600">
                {analysisStage} ({uploadProgress}%)
              </div>
            )}
          </div>
        )}

        {currentView === 'ai_result' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">AI Document Analysis Report</h2>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="p-3 bg-slate-50 rounded-lg"><strong>File:</strong> {aiResult.fileName}</div>
              <div className="p-3 bg-slate-50 rounded-lg"><strong>Pages Detected:</strong> {aiResult.pages}</div>
              <div className="p-3 bg-slate-50 rounded-lg"><strong>Confidence:</strong> {aiResult.confidence}%</div>
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg font-semibold">Print Readiness: Ready</div>
            </div>
            <button onClick={() => setCurrentView('print_settings')} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl">
              Continue to Print Settings
            </button>
          </div>
        )}

        {currentView === 'print_settings' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Print Options & Live Pricing</h2>
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
              <span className="font-bold">Total Cost:</span>
              <span className="text-3xl font-extrabold text-indigo-600">₹{currentPricing.total}</span>
            </div>
            <button onClick={handleAddToQueue} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl">
              Add to Print Queue
            </button>
          </div>
        )}

        {currentView === 'queue_confirm' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
            <h2 className="text-2xl font-bold text-emerald-600">Job Added to Queue!</h2>
            <div className="p-4 bg-slate-50 rounded-xl font-mono text-sm">
              Job ID: {userJob.id} | Position: #{userJob.queuePos} | Status: {userJob.status}
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={() => setCurrentView('track_job')} className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl">
                Track Print Job
              </button>
              <button onClick={() => setCurrentView('admin_dashboard')} className="px-6 py-2.5 bg-white border border-slate-300 font-bold rounded-xl">
                Operator Dashboard
              </button>
            </div>
          </div>
        )}

        {currentView === 'track_job' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold">Track Print Job: {userJob.id}</h2>
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
              Status: <span className="font-bold text-indigo-700">{userJob.status}</span>
            </div>
            <button onClick={handleProcessNextJob} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg text-xs">
              Simulate Operator Next Step
            </button>
          </div>
        )}

        {currentView === 'admin_dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Operator Dashboard</h2>
              <button onClick={handleProcessNextJob} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-sm">
                Process Next Job
              </button>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-bold text-sm mb-3">Active Print Queue Table</h3>
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Job ID</th>
                    <th>Document</th>
                    <th>User</th>
                    <th>Pages</th>
                    <th>Mode</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(j => (
                    <tr key={j.id} className="border-b hover:bg-slate-50">
                      <td className="py-2 font-mono font-bold text-indigo-600">{j.id}</td>
                      <td>{j.docName}</td>
                      <td>{j.user}</td>
                      <td>{j.pages}</td>
                      <td>{j.mode}</td>
                      <td><span className="font-bold">{j.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

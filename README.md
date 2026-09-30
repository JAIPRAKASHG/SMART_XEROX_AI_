# SmartPrint AI – AI-Powered Xerox, Document Processing & Print Queue Management System

> **College Project Engineering Prototype**  
> **Academic Stream:** Computer Science & Engineering / Information Technology  
> **Milestone Status:** 35% Functional Prototype Demonstration

---

## 1. Project Overview

### Problem Statement
In colleges, xerox/printing shops still handle document uploads, page counting, document checking, pricing, and print queues manually. This causes:
- Long waiting times and crowded counters during assignment submission deadlines
- Confusion between customer print orders and duplicate print jobs
- Manual miscounting of pages and incorrect billing
- Unclear waiting times and queue anxiety for students
- Cybersecurity risks from sharing infected USB flash drives

### Proposed Solution
**SmartPrint AI** is a modern web application that demonstrates how AI and automated queue spooling can automate the entire document ingestion, page counting, pricing, and print-status tracking workflow.

---

## 2. Technology Stack

- **Frontend:** React.js 18, Vite, JavaScript (ES6+), Tailwind CSS, Lucide React icons
- **Backend:** Node.js, Express.js REST API
- **Database:** SQLite embedded relational database
- **AI Microservice:** Python FastAPI microservice
- **AI & Document Intelligence:** Document classification, PyMuPDF page detection, OCR, and architecture-ready integration hook for **Google Gemini API** (`gemini-1.5-flash`)
- **Print Spooler:** In-browser FIFO queue simulation with CUPS / Windows Print Spooler network architecture readiness

---

## 3. How to Run the Prototype

### Instant Zero-Setup Option (Recommended for Quick Presentation)
You can launch the complete, fully interactive 17-screen prototype immediately in any browser without installing Node.js, Python, or running build commands:
1. Navigate to:
   ```
   c:\Users\user\Documents\smartprint-ai\index.html
   ```
2. Double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, or Firefox.
3. Use the **Top Demo Toolbar** to jump directly to any of the 17 modules, or follow the natural end-to-end user flow!

### Modular Development Setup (Optional)

#### A. Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
# Running at http://localhost:5173
```

#### B. Backend (Node.js + Express + SQLite)
```bash
cd backend
npm install
npm run start
# Running at http://localhost:5000
```

#### C. AI Microservice (Python FastAPI)
```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# Running at http://localhost:8000
```

---

## 4. End-to-End User Flow

```
User opens website
        ↓
Upload Document (PDF, DOCX, JPG, PNG)
        ↓
Document Validation (MIME check, size verification)
        ↓
AI Document Analysis (FastAPI / Gemini hook)
        ↓
Extract: Pages, Content Type, Print Suitability
        ↓
Select Print Options (Copies, B&W/Colour, Duplex, Size)
        ↓
Calculate Live Estimated Price (e.g. 12 pgs × 2 copies = ₹24)
        ↓
Add Print Job to Queue (e.g. Job ID: SP-2026-00124)
        ↓
Queue Position Generated (#4, Est. Wait: 8 mins)
        ↓
Admin/Operator Dashboard & Spooler
        ↓
Job Processing ("Process Next Job")
        ↓
Printing Simulation (Waiting → Printing → Completed)
        ↓
User Receives Live Completion Notification & Pickup Token
```

---

## 5. Overview of 17 Project Pages & Modules

| # | Screen / View | Description |
|---|---|---|
| **1** | **Landing Page** | Professional hero ("Smart Printing. Less Waiting."), visual workflow, 6 feature cards, live metric counters. |
| **2** | **Document Upload** | Drag-and-drop file ingestion, 3 one-click sample college notes, file progress bar, remove button. |
| **3** | **AI Analysis Result** | 94% confidence card, page count detection, printable content classification, 4 integrity checks. |
| **4** | **Print Settings** | Interactive copies counter `[-] 1 [+]`, B&W vs Colour, Duplex toggle, Paper Size (A4, A3, Letter), live cost calculation. |
| **5** | **Queue Confirmation** | "Print Job Successfully Added", Job ID `SP-2026-00124`, Queue Position `#4`, 8-minute wait estimate, visual queue order board. |
| **6** | **Track Job** | 5-stage real-time progress tracker (Uploaded → Analysed → In Queue → Printing → Completed), cancel action, live status updates. |
| **7** | **Admin Dashboard** | Operator control center, KPI cards (Active: 8, Waiting: 14, Completed: 67, Avg Wait: 6 min), "Process Next Job" trigger. |
| **8** | **Admin Print Queue** | Full interactive queue table (`SP-001` to `SP-005`), Start/Pause/Complete/Cancel actions, instant queue re-indexing. |
| **9** | **Document Management** | Repository of uploaded files, AI status badges (Analysed, Pending, Failed), print state. |
| **10** | **Analytics Page** | Interactive charts for weekly print volume, 74% B&W vs 26% Colour ratio, peak hourly wait times, document format distribution. |
| **11** | **Project Better Tomorrow** | Pathway A user-centric validation, target personas, 10-student empathy table (labeled as Prototype / Demo Validation Data). |
| **12** | **AI Prompt Audit** | Exact prompts for document classification, page count detection, printability assessment, and color density. |
| **13** | **User Validation Report** | 10 demo user completion rates (Upload 10/10, Analysis 9/10, Print Config 10/10, Queue 10/10, Tracking 9/10). |
| **14** | **Development Progress (35%)**| Functional module completion bars, recommended repository tree, development milestones log. |
| **15** | **System Architecture** | High-definition architecture diagram connecting User → React → Express → SQLite → FastAPI → Spooler → Printer. |
| **16** | **Workflow Diagram** | 11-step visual state machine and lifecycle diagram. |
| **17** | **Technical Stack & Viva Guide**| Exact tech stack specifications, future hardware integration roadmap, and 10 viva defense questions & answers. |

---

## 6. Project Better Tomorrow & Academic Compliance

### Pathway A – User-Centric Validation
- **Target Users:** College students, Department faculty, Xerox shop operators.
- **Pain Point Audit (Demo Sample):**
  - Long waiting time: 8/10 students
  - Unclear queue position: 7/10 students
  - Manual document handling: 8/10 students
  - Difficulty tracking print job: 6/10 students

> [!NOTE]
> **Anti-Fabrication Notice:** In accordance with university project integrity standards, all user feedback data, task completion scores, and repository milestone commits are explicitly labeled as **"Demo Data / Prototype Simulation"** and should be replaced with final institutional survey results prior to thesis submission.

---

## 7. College Project Viva & Defense FAQ

#### Q1: How does SmartPrint AI detect page count automatically?
**Answer:** The document ingestion pipeline passes the file to the Python FastAPI microservice. Using `PyMuPDF` (`fitz`), the service parses the internal PDF document catalog and page object dictionary tree (`/Pages`, `/Count`). This bypasses superficial header metadata which can often be incorrect, and also identifies blank separator pages to ensure students are only billed for actual printable content.

#### Q2: How does the pricing engine calculate print fees?
**Answer:** The pricing formula is:
$$\text{Total Cost} = \text{Effective Pages} \times \text{Number of Copies} \times \text{Base Rate} \times \text{Paper Size Multiplier}$$
For example: 12 pages $\times$ 2 copies $\times$ ₹1.00 (B&W Double-sided A4) = **₹24.00**.

#### Q3: Why is a microservices architecture used instead of a monolith?
**Answer:** Heavy document parsing (OCR, rendering, layout analysis) is CPU-bound. If executed on the main Node.js event loop, it would block incoming HTTP requests from other students. By delegating document analysis to an asynchronous Python FastAPI service, the Node.js API remains fast and non-blocking.

#### Q4: How is printer hardware connected in a real-world deployment?
**Answer:** In the prototype, print processing is simulated via an automated FIFO spooler state machine. In production, the backend communicates with the operating system print spooler (CUPS on Linux/macOS or `win32print` on Windows) via IPP (Internet Printing Protocol) or raw socket printing (Port 9100) directly to commercial Xerox multi-function printers.

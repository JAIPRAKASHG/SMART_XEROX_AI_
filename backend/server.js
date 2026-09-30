const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Setup upload directory
const uploadDir = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// --- API ROUTES ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 1. Upload & Simulated AI Analysis Integration endpoint
app.post('/api/upload', upload.single('document'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No document file provided.' });
    }

    const docId = 'DOC-' + Math.floor(1000 + Math.random() * 9000);
    const ext = path.extname(file.originalname).replace('.', '').toUpperCase();

    // Simulated AI Document Analysis (can also proxy to Python FastAPI service on port 8000)
    const mockPages = ext === 'PNG' || ext === 'JPG' ? 1 : 12;
    const aiAnalysis = {
      docId,
      fileName: file.originalname,
      fileType: ext,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      pages: mockPages,
      detectedContent: ext === 'PNG' || ext === 'JPG' ? 'Graphic / Poster' : 'Text Document',
      printReadiness: 'Ready',
      confidence: 94.2,
      analysisText: `Document contains ${mockPages} printable pages with standard text content.`,
      checks: [
        { text: 'File valid', passed: true },
        { text: 'Pages detected', passed: true },
        { text: 'Print-ready', passed: true },
        { text: 'No corruption detected', passed: true }
      ]
    };

    // Store in SQLite
    const stmt = db.prepare(`
      INSERT INTO documents (id, file_name, file_type, file_size, file_path, pages, ai_status, ai_confidence, detected_content, print_readiness)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      docId,
      file.originalname,
      ext,
      aiAnalysis.fileSize,
      file.path,
      mockPages,
      'Analysed',
      aiAnalysis.confidence,
      aiAnalysis.detectedContent,
      aiAnalysis.printReadiness
    );
    stmt.finalize();

    res.json({ success: true, analysis: aiAnalysis });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 2. Add Job to Queue
app.post('/api/queue/add', (req, res) => {
  const { docName, user, pages, copies, mode, sides, paperSize, cost } = req.body;
  const jobId = 'SP-2026-' + Math.floor(10000 + Math.random() * 90000);

  db.get("SELECT COUNT(*) AS count FROM print_jobs WHERE status = 'Waiting'", (err, row) => {
    const queuePos = (row ? row.count : 0) + 1;

    const stmt = db.prepare(`
      INSERT INTO print_jobs (id, user_name, pages, copies, color_mode, sides, paper_size, total_cost, queue_position, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Waiting')
    `);
    stmt.run(jobId, user || 'Student', pages || 12, copies || 1, mode || 'B&W', sides || 'Double-sided', paperSize || 'A4', cost || 24, queuePos, function(insertErr) {
      if (insertErr) {
        return res.status(500).json({ error: insertErr.message });
      }
      res.json({
        success: true,
        job: {
          id: jobId,
          docName: docName || 'Document.pdf',
          queuePos,
          status: 'Waiting',
          waitMinutes: queuePos * 2
        }
      });
    });
    stmt.finalize();
  });
});

// 3. Get Active Queue List
app.get('/api/queue', (req, res) => {
  db.all("SELECT * FROM print_jobs ORDER BY queue_position ASC, created_at ASC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ jobs: rows });
  });
});

// 4. Operator: Process Next Job
app.post('/api/queue/process-next', (req, res) => {
  // 1) Mark currently printing job as completed
  db.run("UPDATE print_jobs SET status = 'Completed', completed_at = CURRENT_TIMESTAMP WHERE status = 'Printing'", () => {
    // 2) Find earliest waiting job and set to printing
    db.get("SELECT id FROM print_jobs WHERE status = 'Waiting' ORDER BY queue_position ASC LIMIT 1", (err, nextJob) => {
      if (!nextJob) {
        return res.json({ message: 'No waiting jobs in queue.' });
      }
      db.run("UPDATE print_jobs SET status = 'Printing', queue_position = 1 WHERE id = ?", [nextJob.id], () => {
        // 3) Recalculate remaining queue positions
        db.all("SELECT id FROM print_jobs WHERE status = 'Waiting' ORDER BY queue_position ASC", (allErr, waitingList) => {
          let pos = 2;
          waitingList.forEach(item => {
            db.run("UPDATE print_jobs SET queue_position = ? WHERE id = ?", [pos++, item.id]);
          });
          res.json({ success: true, printingJobId: nextJob.id });
        });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`SmartPrint AI Express Server running on port ${PORT}`);
});

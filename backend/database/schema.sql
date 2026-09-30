-- SmartPrint AI SQLite Database Schema
-- Pre-configured tables for documents, print jobs, pricing rules, and operator logs

CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size TEXT,
  file_path TEXT,
  pages INTEGER DEFAULT 1,
  ai_status TEXT DEFAULT 'Pending',
  ai_confidence REAL DEFAULT 0.0,
  detected_content TEXT,
  print_readiness TEXT DEFAULT 'Ready',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS print_jobs (
  id TEXT PRIMARY KEY,
  document_id TEXT,
  user_name TEXT NOT NULL,
  pages INTEGER NOT NULL,
  copies INTEGER NOT NULL DEFAULT 1,
  color_mode TEXT NOT NULL, -- 'B&W' or 'Colour'
  sides TEXT NOT NULL,      -- 'Single-sided' or 'Double-sided'
  paper_size TEXT NOT NULL, -- 'A4', 'A3', 'Letter'
  total_cost REAL NOT NULL,
  queue_position INTEGER,
  status TEXT DEFAULT 'Waiting', -- 'Waiting', 'Printing', 'Completed', 'Paused', 'Cancelled'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (document_id) REFERENCES documents (id)
);

CREATE TABLE IF NOT EXISTS pricing_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mode TEXT NOT NULL,       -- 'bw' or 'colour'
  sides TEXT NOT NULL,      -- 'single' or 'double'
  rate_per_page REAL NOT NULL
);

-- Seed initial standard campus rates
INSERT OR IGNORE INTO pricing_rules (id, mode, sides, rate_per_page) VALUES
(1, 'bw', 'single', 1.50),
(2, 'bw', 'double', 1.00),
(3, 'colour', 'single', 7.00),
(4, 'colour', 'double', 5.00);

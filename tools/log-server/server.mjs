import express from 'express';
import cors from 'cors';
import { appendFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOG_DIR = join(__dirname, 'logs');
const LOG_FILE = join(LOG_DIR, 'hmi.log');

const PORT = process.env.PORT ?? 3000;

await mkdir(LOG_DIR, { recursive: true });

const app = express();

// CORS: allow the Angular dev servers (shell on 4200, remotes on 4300+)
app.use(cors({
  origin: [
    'http://localhost:4200',
    'http://localhost:4300',
  ],
  credentials: false,
}));

app.use(express.json({ limit: '1mb' }));

app.post('/logs', async (req, res) => {
  const record = req.body;

  // Minimal shape validation — never trust the client blindly.
  if (!record || typeof record !== 'object' || !record.level) {
    return res.status(400).json({ error: 'Invalid log record' });
  }

  // One line per record, newline-delimited JSON (NDJSON).
  const line = JSON.stringify({
    receivedAt: new Date().toISOString(),
    ...record,
  }) + '\n';

  try {
    await appendFile(LOG_FILE, line, 'utf8');
    res.status(204).end();
  } catch (err) {
    console.error('[log-server] write failed:', err);
    res.status(500).json({ error: 'Write failed' });
  }
});

// Simple health check so you can verify the server is up
app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`[log-server] listening on http://localhost:${PORT}`);
  console.log(`[log-server] writing to ${LOG_FILE}`);
});
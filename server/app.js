// app.js
// Express application setup: middleware, routes, and error handling.
// Server startup (listen) lives in server.js so this file can be imported
// in tests without binding a port.

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { env } from './config/env.js';
import improveRoutes from './routes/improveRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
  })
);
app.use(express.json({ limit: '100kb' }));

app.use('/api', healthRoutes);
app.use('/api', improveRoutes);

// In production (e.g. inside the Docker image), the client is pre-built and
// copied to server/public. Express serves it directly so the whole app runs
// behind a single port — ideal for AWS App Runner.
const clientDist = path.join(__dirname, 'public');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

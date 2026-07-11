// middleware/errorHandler.js
// Centralized error handler. Never leaks stack traces or internal details
// in production responses.

import { env } from '../config/env.js';

export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Route not found.' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err);

  // OpenAI SDK errors carry a `status` property.
  const status = err.status || err.statusCode || 500;

  let message = 'Something went wrong. Please try again.';
  if (status === 401) message = 'AI provider authentication failed.';
  if (status === 429) message = 'Rate limit exceeded. Please slow down and try again shortly.';
  if (status === 400) message = err.message || 'Invalid request.';

  const payload = { error: message };
  if (env.NODE_ENV !== 'production') {
    payload.detail = err.message;
  }

  if (!res.headersSent) {
    res.status(status).json(payload);
  } else {
    // If we already started an SSE stream, just end it.
    res.end();
  }
}

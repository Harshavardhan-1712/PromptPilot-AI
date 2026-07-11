// config/env.js
// Centralized environment variable loading & validation.
// This is the ONLY place that should read process.env directly for app config,
// so secrets never leak accidentally into other modules or the client.

import dotenv from 'dotenv';

dotenv.config();

const required = ['GEMINI_API_KEY'];

function validateEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    // Fail fast and loud on boot rather than surfacing a confusing 500 later.
    console.error(
      `[FATAL] Missing required environment variables: ${missing.join(', ')}\n` +
        'Copy .env.example to .env and fill in the values.'
    );
    process.exit(1);
  }
}

validateEnv();

export const env = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000,
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX) || 20,
};

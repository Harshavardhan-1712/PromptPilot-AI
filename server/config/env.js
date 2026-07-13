import dotenv from "dotenv";

dotenv.config();

const required = ["GEMINI_API_KEY"];

const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(
    `[FATAL] Missing environment variables: ${missing.join(", ")}`
  );
  process.exit(1);
}

export const env = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",

  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: process.env.GEMINI_MODEL || "gemini-2.5-flash",

  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",

  RATE_LIMIT_WINDOW_MS:
    Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,

  RATE_LIMIT_MAX:
    Number(process.env.RATE_LIMIT_MAX) || 20,
};

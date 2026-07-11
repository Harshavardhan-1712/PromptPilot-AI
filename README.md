# PromptPilot AI

**Transform Simple Prompts into Expert AI Prompts.**

PromptPilot AI is a full-stack web application that rewrites plain, casual prompts into clear, detailed, optimized prompts for ChatGPT, Claude, and Gemini — streamed back to you token by token in real time.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Docker](#docker)
- [AWS Deployment](#aws-deployment-app-runner)
- [API Reference](#api-reference)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

---

## Overview

Most people don't naturally write prompts the way LLMs respond to best. PromptPilot AI closes that gap: type what you mean, pick a style, and get back a rewritten, model-ready prompt — without losing your original intent.

## Features

- ✍️ Plain-language prompt input with live character counter
- 🎛️ Five optimization styles: Professional, Creative, Detailed, Concise, GPT Optimized
- ⚡ Real-time streaming responses via Server-Sent Events (SSE)
- 📋 One-click copy of the generated prompt
- 🕓 Prompt history saved locally in the browser (Local Storage), with clear-history option
- 🌙 Premium dark SaaS interface, fully responsive (desktop, tablet, mobile)
- 🔒 API keys never touch the client — all requests are proxied through the backend
- 🚦 Input validation, rate limiting, and graceful error handling throughout

## Tech Stack

**Frontend**
- React 18 (Vite)
- Tailwind CSS
- Native `fetch` streaming (SSE parsing)

**Backend**
- Node.js + Express
- OpenAI API (streaming chat completions)
- `express-rate-limit`, `cors`, `dotenv`

**Deployment**
- Docker (multi-stage build)
- AWS App Runner compatible

## Folder Structure

```
promptpilot-ai/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/        # Navbar, Hero, PromptInput, StyleSelector, etc.
│   │   ├── pages/              # Dashboard.jsx (page composition)
│   │   ├── hooks/               # useImprovePrompt, useToast
│   │   ├── services/            # api.js (SSE streaming client)
│   │   ├── utils/                # historyStorage.js (Local Storage)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Express backend
│   ├── controllers/            # improveController.js (SSE handler)
│   ├── routes/                 # improveRoutes.js, healthRoutes.js
│   ├── services/                # openaiService.js, promptBuilder.js
│   ├── middleware/              # validation, error handling, rate limiting
│   ├── config/                   # env.js (centralized env validation)
│   ├── app.js
│   └── server.js
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Installation

Requires **Node.js 18+** and **npm**.

```bash
git clone <your-repo-url> promptpilot-ai
cd promptpilot-ai

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

## Environment Variables

Copy the example file and fill in your OpenAI key:

```bash
cp .env.example .env
```

| Variable | Location | Description | Default |
|---|---|---|---|
| `OPENAI_API_KEY` | server | **Required.** Your OpenAI API key | — |
| `OPENAI_MODEL` | server | Chat model used for generation | `gpt-4o-mini` |
| `PORT` | server | Port the server listens on | `8080` |
| `NODE_ENV` | server | `development` or `production` | `development` |
| `CORS_ORIGIN` | server | Allowed origin for the client | `http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | server | Rate limit window (ms) for `/api/improve` | `60000` |
| `RATE_LIMIT_MAX` | server | Max requests per window per IP | `20` |
| `VITE_API_URL` | client | Backend URL if not same-origin | *(empty = same origin)* |

> The server refuses to start if `OPENAI_API_KEY` is missing — check the console for a clear error.

## Running Locally

Run backend and frontend in two terminals:

```bash
# Terminal 1 — backend (http://localhost:8080)
cd server
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd client
npm run dev
```

The Vite dev server proxies `/api/*` requests to `http://localhost:8080`, so no CORS configuration is needed in development.

Open **http://localhost:5173** and start improving prompts.

## Docker

Build and run the whole app (frontend + backend) as a single container on one port:

```bash
docker build -t promptpilot-ai .
docker run -p 8080:8080 --env-file .env promptpilot-ai
```

Or with Docker Compose:

```bash
docker compose up --build
```

Visit **http://localhost:8080** — Express serves the built React app and the API from the same origin.

## AWS Deployment (App Runner)

The image is built to run without extra configuration on AWS App Runner:

1. Push the image to **Amazon ECR**:
   ```bash
   aws ecr create-repository --repository-name promptpilot-ai
   docker build -t promptpilot-ai .
   docker tag promptpilot-ai:latest <account-id>.dkr.ecr.<region>.amazonaws.com/promptpilot-ai:latest
   aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/promptpilot-ai:latest
   ```
2. In the App Runner console, create a service from the ECR image.
3. Set environment variables in the App Runner service config: `OPENAI_API_KEY`, `OPENAI_MODEL`, `CORS_ORIGIN` (e.g. your App Runner URL), `NODE_ENV=production`.
4. App Runner automatically injects `PORT` and the app listens on `process.env.PORT` — no changes needed.
5. Deploy. App Runner health-checks `/api/health`, which the app exposes out of the box.

## API Reference

### `POST /api/improve`

Streams an optimized prompt back as **Server-Sent Events**.

**Request body**
```json
{
  "prompt": "Write a resume",
  "style": "Professional"
}
```

`style` must be one of: `Professional`, `Creative`, `Detailed`, `Concise`, `GPT Optimized`.

**Response** — `text/event-stream`
```
event: token
data: {"token":"Write"}

event: token
data: {"token":" a"}

event: done
data: {"done":true}
```

On failure, an `error` event is emitted with a JSON `{ "error": "..." }` payload, and standard error status codes (`400`, `401`, `429`, `500`) are used for non-streaming failures (e.g. validation errors before the stream opens).

### `GET /api/health`

Returns `{ "status": "ok", "timestamp": "..." }` — used for container/App Runner health checks.

## Screenshots

*(Add screenshots of the dashboard, streaming response, and mobile view here.)*

```
docs/screenshot-dashboard.png
docs/screenshot-streaming.png
docs/screenshot-mobile.png
```

## Future Enhancements

- User accounts with cloud-synced prompt history (replacing/augmenting Local Storage)
- Side-by-side comparison of multiple optimization styles
- Support for additional providers (Anthropic, Google) as selectable backends
- Prompt templates and saved favorites
- Usage analytics dashboard
- Team/workspace sharing of optimized prompts

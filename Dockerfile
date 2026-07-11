# ─────────────────────────────────────────────────────────
# PromptPilot AI — Production Dockerfile
# Multi-stage build: (1) build the React client, (2) install the
# Express server, (3) assemble a slim runtime image that serves both
# from a single port — ideal for AWS App Runner.
# ─────────────────────────────────────────────────────────

# ---- Stage 1: Build client ----
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# ---- Stage 2: Install server dependencies ----
FROM node:20-alpine AS server-deps
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --omit=dev

# ---- Stage 3: Runtime image ----
FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Run as non-root for security
RUN addgroup -S promptpilot && adduser -S promptpilot -G promptpilot

# Server code + production dependencies
COPY server/ ./
COPY --from=server-deps /app/server/node_modules ./node_modules

# Built client, served as static files by Express
COPY --from=client-build /app/client/dist ./public

USER promptpilot

# AWS App Runner (and most PaaS providers) inject PORT; default to 8080 locally.
ENV PORT=8080
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:'+(process.env.PORT||8080)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]

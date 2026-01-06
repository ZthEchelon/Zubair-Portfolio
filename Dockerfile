# Multi-stage build for faster, smaller deploys on Render

FROM node:20 AS builder
WORKDIR /app

# Install dependencies (dev deps needed to build)
COPY package*.json ./
RUN npm ci

# Build client + server
COPY . .
RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Install only production deps for the bundled server
COPY package*.json ./
RUN npm ci --omit=dev

# Bring over the compiled assets
COPY --from=builder /app/dist ./dist

# Render will expose $PORT; default to 8080
EXPOSE 8080

CMD ["node", "dist/index.cjs"]

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps 2>/dev/null || npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Regenerate /analytics-config.js from env on every container start, so the
# dummy analytics numbers are runtime-configurable via .env (no rebuild needed).
COPY docker/40-analytics-config.sh /docker-entrypoint.d/40-analytics-config.sh
RUN chmod +x /docker-entrypoint.d/40-analytics-config.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
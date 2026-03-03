# 1. Dependency / Build
FROM node:20-alpine AS builder

WORKDIR /app

ARG WEB_URL
ARG API_URL
ARG API_URL_SERVER

ENV NEXT_PUBLIC_WEB_URL=$WEB_URL
ENV NEXT_PUBLIC_API_URL=$API_URL

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .

ENV NODE_ENV=production

RUN pnpm run build

# 2. Runtime
FROM node:20-alpine AS runner

WORKDIR /app
RUN npm install -g pnpm

ENV NODE_ENV=production
ENV PORT=3000

ARG API_URL_SERVER
ENV API_URL_SERVER=$API_URL_SERVER

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./ 

EXPOSE 3000
CMD ["pnpm", "start"]
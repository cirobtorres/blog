# 1. Dependency / Build
FROM node:22-alpine AS builder

WORKDIR /app

RUN apk update --no-cache && apk upgrade --no-cache && rm -rf /var/cache/apk/*

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ARG WEB_URL
ARG API_URL
ARG API_URL_SERVER
ARG CLOUDINARY_CLOUD_NAME
ARG KEYCLOAK_URL
ARG KEYCLOAK_REALM
ARG KEYCLOAK_BLOG_WEB_CLIENT_ID
ARG NEXTAUTH_URL

ENV NODE_ENV=production
ENV NEXT_PUBLIC_WEB_URL=$WEB_URL
ENV NEXT_PUBLIC_API_URL=$API_URL
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_API_URL_SERVER=$API_URL_SERVER

RUN npm run build

# 2. Runtime
FROM node:22-alpine AS runner

WORKDIR /app

RUN apk update --no-cache && apk upgrade --no-cache && rm -rf /var/cache/apk/*

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]

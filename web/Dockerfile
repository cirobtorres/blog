# 1. Dependency / Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package.json package-lock.json ./

# Instalar dependências de forma limpa e segura para produção
RUN npm ci

# Copiar o restante do código fonte
COPY . .

# Declarar ARGs para build (variáveis públicas/não sensíveis)
ARG WEB_URL
ARG API_URL
ARG API_URL_SERVER
ARG CLOUDINARY_CLOUD_NAME
ARG KEYCLOAK_URL
ARG KEYCLOAK_REALM
ARG KEYCLOAK_BLOG_WEB_CLIENT_ID
ARG NEXTAUTH_URL

ENV NEXT_PUBLIC_WEB_URL=$WEB_URL
ENV NEXT_PUBLIC_API_URL=$API_URL
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_API_URL_SERVER=$API_URL_SERVER
ENV NODE_ENV=production

RUN npm run build

# 2. Runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./ 

EXPOSE 3000

CMD ["npm", "start"]

# 1. Dependency / Build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar pnpm com suporte a Corepack para garantir a versão correta se houver lockfile
RUN npm install -g pnpm

# Copiar arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package.json pnpm-lock.yaml* ./

# Instalar dependências (removendo --frozen-lockfile temporariamente se o lockfile local estiver desatualizado)
RUN pnpm install --frozen-lockfile

# Copiar o restante do código fonte
COPY . .

# Declarar ARGs para build (variáveis públicas/não sensíveis)
ARG WEB_URL
ARG API_URL
ARG API_URL_SERVER
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG KEYCLOAK_URL
ARG KEYCLOAK_REALM
ARG KEYCLOAK_BLOG_WEB_CLIENT_ID

ENV NEXT_PUBLIC_WEB_URL=$WEB_URL
ENV NEXT_PUBLIC_API_URL=$API_URL
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_API_URL_SERVER=$API_URL_SERVER
ENV KEYCLOAK_URL=$KEYCLOAK_URL
ENV KEYCLOAK_REALM=$KEYCLOAK_REALM
ENV KEYCLOAK_BLOG_WEB_CLIENT_ID=$KEYCLOAK_BLOG_WEB_CLIENT_ID
ENV NODE_ENV=production

# Para dados sensíveis (API Keys e Secrets), injetamos via BuildKit secrets ou passamos em tempo de build 
# sem persistir no histórico como ENV se preferir, ou mapeamos corretamente para evitar os warnings.
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG KEYCLOAK_BLOG_WEB_CLIENT_SECRET

ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET
ENV KEYCLOAK_BLOG_WEB_CLIENT_SECRET=$KEYCLOAK_BLOG_WEB_CLIENT_SECRET

RUN pnpm run build

# 2. Runtime
FROM node:20-alpine AS runner

WORKDIR /app
RUN npm install -g pnpm

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./ 

EXPOSE 3000
CMD ["pnpm", "start"]

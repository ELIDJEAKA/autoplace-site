# syntax=docker/dockerfile:1

# ---- Build : Vite (les variables VITE_* sont figées dans le bundle au moment du build) ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG VITE_SITE_URL=http://45.90.161.191:3000
ARG VITE_DASHBOARD_URL=http://45.90.161.191:5173
ARG VITE_PLAY_STORE_URL=
ARG VITE_APP_STORE_URL=
ARG VITE_CONTACT_EMAIL=autoeburni@gmail.com
ARG VITE_CONTACT_PHONE=
ARG VITE_API_URL=https://preview-api.autoeburni.ci/api/v1
ARG VITE_TURNSTILE_SITE_KEY=
ENV VITE_SITE_URL=${VITE_SITE_URL} \
    VITE_DASHBOARD_URL=${VITE_DASHBOARD_URL} \
    VITE_PLAY_STORE_URL=${VITE_PLAY_STORE_URL} \
    VITE_APP_STORE_URL=${VITE_APP_STORE_URL} \
    VITE_CONTACT_EMAIL=${VITE_CONTACT_EMAIL} \
    VITE_CONTACT_PHONE=${VITE_CONTACT_PHONE} \
    VITE_API_URL=${VITE_API_URL} \
    VITE_TURNSTILE_SITE_KEY=${VITE_TURNSTILE_SITE_KEY}
RUN npm run build

# ---- Service : nginx (fichiers statiques + repli SPA sur index.html) ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1

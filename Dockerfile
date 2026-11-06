# Static build of the site served by an unprivileged nginx on port 8080
# (docs/deployment.md → Home lab).
FROM node:24-alpine AS build
RUN npm install -g pnpm@12
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginxinc/nginx-unprivileged:1.30-alpine
LABEL org.opencontainers.image.source="https://github.com/alexkander/alexkander.github.io"
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080

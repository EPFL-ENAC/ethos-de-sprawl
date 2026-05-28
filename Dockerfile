FROM node:24-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production-stage

RUN set -eux; \
	mkdir -p /app; \
	chown -R nginx:nginx /app

COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage --chown=nginx:nginx /app/dist/spa /app

USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM node:14-alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1-alpine as production

RUN apk add nodejs

COPY --from=builder /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/generate-config.js /

EXPOSE 80

CMD node generate-config.js && nginx -g "daemon off;"

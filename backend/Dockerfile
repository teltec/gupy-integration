FROM node:18.15.0-alpine as build

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM node:18.15.0-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

RUN npm install -g pm2

CMD [ "pm2-runtime", "dist/main.js" ]

FROM node:12 AS build

WORKDIR /app
COPY bin/ bin/
COPY resources/ resources/
COPY web/ web/
COPY package.json package-lock.json ./
RUN ls -la
RUN npm ci --only=production

FROM gcr.io/distroless/nodejs-debian10:12
COPY --from=build /app /app
WORKDIR /app
ENTRYPOINT ["/nodejs/bin/node", "/app/bin/kuvia.js"]

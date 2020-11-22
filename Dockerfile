FROM node:12 AS build

WORKDIR /app
COPY bin/ bin/
COPY resources/ resources/
COPY web/ web/
COPY package.json package-lock.json ./
RUN npm ci --only=production
RUN mkdir -p /workspace && chmod -R 777 /workspace

FROM gcr.io/distroless/nodejs-debian10:12
COPY --from=build /app /app
COPY --from=build /workspace /workspace
WORKDIR /workspace
ENTRYPOINT ["/nodejs/bin/node", "/app/bin/kuvia.js"]

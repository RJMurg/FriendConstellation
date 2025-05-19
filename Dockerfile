# Step 1: Build stage
FROM node:18-alpine AS prebuild
WORKDIR /app
COPY . .
RUN npm ci

# Step 2: Production stage
FROM node:18-alpine AS build
WORKDIR /app
COPY --from=prebuild /app .
RUN npm run build

# Step 3: Built Step
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/start.sh ./start.sh

RUN chmod +x ./start.sh
RUN npm ci --prod

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --start-interval=5s \
    CMD ["sh", "-c", "wget -q --spider http://127.0.0.1:3000/ || exit 1"]

CMD ["./start.sh"]
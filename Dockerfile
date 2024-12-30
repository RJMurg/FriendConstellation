# Step 1: Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci

# Step 2: Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app .
RUN chmod +x ./start.sh

HEALTHCHECK --interval=1m --timeout=30s --start-period=30s --start-interval=3s \
    CMD ["sh", "-c", "curl -f http://localhost:3000/ || exit 1"]

CMD ["./start.sh"]
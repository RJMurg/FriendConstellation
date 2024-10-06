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
CMD ["./start.sh"]
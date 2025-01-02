#!/bin/sh

# Wait for the database to be ready
echo "Waiting for DB to be ready..."
until nc -z starboard-db 5432; do
  sleep 1
done
echo "DB is ready."

# Check if the previous build was successful or if the build success file doesn't exist
if [ ! -f ./build-success ] || grep -q "false" ./build-success; then
  echo "Previous build failed or build success file doesn't exist. Rebuilding..."

  echo "Generating Prisma Client"
  npx prisma generate

  # Run Prisma migrations
  echo "Running Prisma migrations..."
  npx prisma migrate deploy

  echo "Building Site"
  npm run build

  # If build was successful, write a token to the file system
  if [ $? -eq 0 ]; then
    echo "Build successful."
    echo "true" > ./build-success
  else
    echo "Build failed."
    echo "false" > ./build-success
  fi
else
  echo "Previous build was successful. Skipping build steps."
fi

# Start the server
echo "Starting server..."
node build
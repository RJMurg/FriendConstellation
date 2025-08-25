# Check if the previous build was successful or if the build success file doesn't exist
if [ ! -f ./first-start-fragment ] || grep -q "false" ./first-start-fragment; then
  echo "Previous build failed or build success file doesn't exist. Rebuilding..."

  echo "Generating Prisma Client"
  npx prisma generate

  # Run Prisma migrations
  echo "Running Prisma migrations..."
  npx prisma migrate deploy

  # If build was successful, write a token to the file system
  if [ $? -eq 0 ]; then
    echo "Build successful."
    echo "true" > ./first-start-fragment
  else
    echo "Build failed."
    echo "false" > ./first-start-fragment
  fi
else
  echo "Previous build was successful. Skipping build steps."
fi

# Start the server
echo "Starting server..."
node build

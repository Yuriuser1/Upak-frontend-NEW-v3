
#!/bin/bash

echo "=== UPAK Frontend - Final Static Build ==="

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf out .next tsconfig.tsbuildinfo .build

# Copy static config
echo "Using static config..."
cp next.config.static-deploy.js next.config.js

# Build the app
echo "Building static site..."
npm run build

echo "Static build completed successfully!"
echo "Deploy the 'out' directory to your hosting platform"

ls -la out/

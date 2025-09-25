
#!/bin/bash

echo "Building UPAK static site..."

# Backup current config
if [ -f "next.config.js" ]; then
    cp next.config.js next.config.backup.js
fi

# Use our static config
cp next.config.upak.js next.config.js

# Build the project
npm run build

# Restore original config
if [ -f "next.config.backup.js" ]; then
    mv next.config.backup.js next.config.js
else
    rm next.config.js
fi

echo "Build completed!"

#!/bin/bash

# This script is specifically for Vercel deployment

# Clean cache to reduce memory usage
echo "🧹 Cleaning Next.js cache..."
rm -rf .next/cache

# Set environment variables for optimization
export NODE_OPTIONS="--max-old-space-size=4096 --max-semi-space-size=64 --optimize-for-size"
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production

# Build in production mode with minimal output
echo "🔧 Building for Vercel deployment..."
next build --no-lint

echo "✅ Vercel build completed!"
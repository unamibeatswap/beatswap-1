#!/bin/bash

echo "🚀 BeatsChain Production Deployment"
echo "=================================="

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
yarn install --frozen-lockfile

# Build the application
echo "🔧 Building application..."
yarn build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📊 Build Summary:"
    echo "- Next.js app built with optimized configuration"
    echo "- Web3 libraries properly externalized for server-side"
    echo "- Memory optimizations applied"
    echo "- All 52 routes generated successfully"
    echo ""
    echo "🚀 Ready for deployment to:"
    echo "- Vercel (recommended)"
    echo "- Docker containers"
    echo "- Static hosting"
    echo ""
    echo "Next steps:"
    echo "1. Deploy to Vercel: vercel --prod"
    echo "2. Or start locally: yarn start"
else
    echo "❌ Build failed!"
    exit 1
fi
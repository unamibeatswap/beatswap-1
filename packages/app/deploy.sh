#!/bin/bash

# BeatsChain Deployment Script
echo "🚀 Starting BeatsChain deployment..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Login to Firebase (if not already logged in)
echo "🔐 Checking Firebase authentication..."
firebase login --no-localhost

# Set Firebase project
echo "📋 Setting Firebase project..."
firebase use beatswap-36c32

# Deploy Firestore rules
echo "🔥 Deploying Firestore rules..."
firebase deploy --only firestore:rules

# Deploy Storage rules  
echo "📁 Deploying Storage rules..."
firebase deploy --only storage

# Deploy Firestore indexes
echo "📊 Deploying Firestore indexes..."
firebase deploy --only firestore:indexes

# Build the application
echo "🏗️ Building application..."
npm run build

# Deploy hosting (if needed)
echo "🌐 Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Deployment complete!"
echo ""
echo "🔗 Your app is live at: https://beatswap-36c32.web.app"
echo ""
echo "📋 Post-deployment checklist:"
echo "  ✅ Firestore rules deployed"
echo "  ✅ Storage rules deployed" 
echo "  ✅ Database indexes created"
echo "  ✅ Application hosted"
echo ""
echo "🔧 Next steps:"
echo "  1. Test all functionality"
echo "  2. Monitor error logs"
echo "  3. Set up monitoring alerts"
echo "  4. Begin data migration"
#!/bin/bash

set -e

echo "🚀 Deploying SOCAR Production Dashboard to Vercel..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "📤 Deploying to Vercel..."
npx vercel deploy --prod --scope team_wB2dZBv7RY86VeceOhvO3w89

echo "✅ Deployment complete!"
echo "📍 Your dashboard is live at: https://production-dashboard.vercel.app"

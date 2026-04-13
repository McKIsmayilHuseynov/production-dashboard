#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🚀 Deploying SOCAR Production Dashboard to Vercel...');

try {
  // Build the project
  console.log('📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Deploy to Vercel
  console.log('📤 Deploying to Vercel...');
  execSync('vercel --prod --confirm', { 
    stdio: 'inherit',
    env: { ...process.env, VERCEL_PROJECT_ID: 'prj_iY3Ukrum5XCuSdaxRMEyI4v31866' }
  });
  
  console.log('✅ Deployment complete! Your dashboard is live at:');
  console.log('📍 https://production-dashboard.vercel.app');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}

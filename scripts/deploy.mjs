#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('[Deploy] Starting deployment of SOCAR Production Dashboard...');
console.log('[Deploy] Project ID: prj_iY3Ukrum5XCuSdaxRMEyI4v31866');
console.log('[Deploy] Team: mckinsey (team_wB2dZBv7RY86VeceOhvO3w89)');

try {
  // Check if vercel CLI is installed
  console.log('[Deploy] Checking Vercel CLI...');
  execSync('vercel --version', { stdio: 'inherit' });

  // Deploy to Vercel
  console.log('[Deploy] Deploying application...');
  const deployCommand = 'vercel deploy --prod --scope team_wB2dZBv7RY86VeceOhvO3w89 --project-id prj_iY3Ukrum5XCuSdaxRMEyI4v31866';
  
  const result = execSync(deployCommand, { 
    stdio: 'inherit',
    cwd: '/vercel/share/v0-project'
  });

  console.log('[Deploy] Deployment successful!');
  console.log('[Deploy] Your dashboard is live at: https://production-dashboard.vercel.app');
  process.exit(0);
} catch (error) {
  console.error('[Deploy] Error during deployment:', error.message);
  process.exit(1);
}

#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('[v0] Starting auto-deployment...');

try {
  console.log('[v0] Adding files to git...');
  execSync('git add .', { cwd: process.cwd(), stdio: 'inherit' });

  console.log('[v0] Committing changes...');
  execSync('git commit -m "chore: deploy production dashboard to vercel"', { 
    cwd: process.cwd(), 
    stdio: 'inherit' 
  });

  console.log('[v0] Pushing to GitHub...');
  execSync('git push origin main', { cwd: process.cwd(), stdio: 'inherit' });

  console.log('[v0] SUCCESS! Deployment triggered on Vercel');
  console.log('[v0] Watch progress at: https://vercel.com/mckinsey/production-dashboard');
  console.log('[v0] Your dashboard will be live at: https://production-dashboard.vercel.app');
} catch (error) {
  console.error('[v0] Deployment error:', error.message);
  process.exit(1);
}

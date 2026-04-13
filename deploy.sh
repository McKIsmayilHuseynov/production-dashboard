#!/bin/bash

# Deploy script for Vercel
npm install
npm run build
vercel deploy --prod --scope team_wB2dZBv7RY86VeceOhvO3w89

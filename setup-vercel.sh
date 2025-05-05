#!/bin/bash

# This script installs Vercel CLI globally, logs into Vercel, and links the local repository to your Vercel project.

echo "Installing Vercel CLI globally..."
npm i -g vercel

echo "Logging into Vercel..."
vercel login

echo "Linking local repository to Vercel project..."
vercel link

echo "Setup complete. After linking, the .vercel folder will be created with project.json containing Project ID and Org ID."
echo "You can find the project.json file in the .vercel directory."
echo "Extract the 'projectId' and 'orgId' values from project.json and add them along with your Vercel token as GitHub secrets:"
echo "  - VERCEL_TOKEN"
echo "  - VERCEL_ORG_ID"
echo "  - VERCEL_PROJECT_ID"
echo ""
echo "Your GitHub Actions workflow and vercel.json are already correctly set up for deployment."
echo ""
echo "To run this script, execute: bash setup-vercel.sh"

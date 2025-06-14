#!/bin/bash

# Vercel Ignored Build Step
# This script determines whether Vercel should build and deploy

echo "🔍 Checking if build should proceed..."
echo "Current branch: $VERCEL_GIT_COMMIT_REF"
echo "Commit SHA: $VERCEL_GIT_COMMIT_SHA"

# Only build on main branch or if it's a production deployment
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] || [[ "$VERCEL_ENV" == "production" ]]; then
  echo "✅ Building: This is main branch or production deployment"
  exit 1  # Proceed with build
else
  echo "🚫 Ignoring: This is not main branch, skipping build"
  exit 0  # Skip build
fi

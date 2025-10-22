#!/bin/sh
set -e

echo "🔧 Injecting runtime config..."

# Substitute env vars into runtime-config.js at container start
if [ -f /app/public/runtime-config.js ]; then
  envsubst < /app/public/runtime-config.js > /app/public/runtime-config.tmp && \
  mv /app/public/runtime-config.tmp /app/public/runtime-config.js
else
  echo "⚠️ No runtime-config.js found in /app/public — skipping."
fi

echo "✅ Final runtime-config.js:"
cat /app/public/runtime-config.js || true

echo "🚀 Starting Next.js..."
exec "$@"

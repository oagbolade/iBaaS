#!/bin/sh
set -e

echo "🔧 Injecting runtime config..."

if [ -f /app/public/runtime-config.js ]; then
  envsubst < /app/public/runtime-config.js > /app/public/runtime-config.tmp && \
  mv /app/public/runtime-config.tmp /app/public/runtime-config.js
else
  echo "⚠️ No runtime-config.js found in /app/public — skipping."
fi

echo "✅ Final runtime-config.js:"
cat /app/public/runtime-config.js || true

echo "🚀 Starting Next.js..."

# If a command was passed to the container, run it; otherwise, default to npm start
if [ $# -gt 0 ]; then
  exec "$@"
else
  npm start
fi

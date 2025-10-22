# ---------- Stage 1: Base dependencies (for caching) ----------
FROM iswprodacr.azurecr.io/node:18-alpine AS deps

WORKDIR /app

# Copy dependency files only (better cache)
COPY package*.json ./

# Install all deps using your proxy
RUN npm --proxy=http://172.25.20.117:80 install --legacy-peer-deps

# ---------- Stage 2: Build Stage ----------
FROM iswprodacr.azurecr.io/node:18-alpine AS build

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy project files
COPY . .

# Ensure static export mode is disabled
# (comment out or remove `output: 'export'` in next.config.js)
RUN npm run build

# ---------- Stage 3: Production Runtime ----------
FROM iswprodacr.azurecr.io/node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install runtime tools (gettext provides envsubst)
RUN apk add --no-cache gettext

# Copy only essential files
COPY package*.json ./

# Remove husky prepare hook before install
RUN npm pkg delete scripts.prepare

# Disable husky during npm install (so it never triggers the prepare script)
RUN npm --proxy=http://172.25.20.117:80 install --omit=dev --legacy-peer-deps

# Copy built artifacts and static assets
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./next.config.js

# (Optional) If you use custom fonts or other assets
# COPY --from=build /app/.env ./.env

# ---------- Inject Runtime Config Support ----------
# Copy our entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

CMD ["npm", "start"]

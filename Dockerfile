# Stage 1: Build stage
FROM iswprodacr.azurecr.io/node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY .env .env ./
# RUN npm install --legacy-peer-deps
RUN npm --proxy=http://172.25.20.117:80 install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: NGINX Build Stage
FROM iswprodacr.azurecr.io/nginx:1.12-alpine
WORKDIR /app
# (FOR M1 CHIPS)
# FROM arm64v8/nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

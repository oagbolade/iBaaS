# Stage 1: Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm --proxy=http://172.25.20.117:80 install --force
COPY . .
RUN npm run build

# Stage 2: NGINX Build Stage
FROM nginx:1.12-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 8001
CMD ["nginx", "-g", "daemon off;"]

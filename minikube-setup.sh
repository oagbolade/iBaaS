#!/bin/bash
set -e  # Stop script on any error

APP_NAME="nextjs-app"
IMAGE_NAME="nextjs-app:latest"
K8S_DIR="./k8s"
DOCKERFILE="Dockerfile.dev"
PORT=4000
DRIVER="docker"

# === Colors ===
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m" # No Color

echo -e "${GREEN}🚀 Starting Minikube setup for $APP_NAME...${NC}"

# === 1️⃣ Check dependencies ===
echo -e "${YELLOW}🔍 Checking dependencies...${NC}"
for cmd in docker kubectl minikube; do
  if ! command -v $cmd &> /dev/null; then
    echo -e "${RED}❌ $cmd not found. Please install it first.${NC}"
    exit 1
  fi
done

# === 2️⃣ Start Minikube ===
echo -e "${YELLOW}⚙️  Starting Minikube (driver: $DRIVER)...${NC}"
minikube start --driver=$DRIVER

# === 3️⃣ Use Minikube’s internal Docker daemon ===
echo -e "${YELLOW}🐳 Using Minikube's Docker environment...${NC}"
eval $(minikube docker-env)

# === 4️⃣ Build Docker image ===
echo -e "${YELLOW}🏗 Building Docker image: ${GREEN}$IMAGE_NAME${NC}"
docker build -t $IMAGE_NAME -f $DOCKERFILE .

# === 5️⃣ Enable Ingress (optional) ===
# echo -e "${YELLOW}🧩 Enabling Minikube Ingress addon...${NC}"
# minikube addons enable ingress

# === 6️⃣ Apply all Kubernetes manifests ===
if [ -d "$K8S_DIR" ]; then
  echo -e "${YELLOW}📦 Applying all YAML files in ${K8S_DIR}/ ...${NC}"
  # List YAML files for visibility
  find "$K8S_DIR" -type f \( -name "*.yaml" -o -name "*.yml" \) -print

  # Apply all recursively
  kubectl apply -f "$K8S_DIR" --recursive
else
  echo -e "${RED}⚠️  Kubernetes directory '$K8S_DIR' not found.${NC}"
  exit 1
fi

# === 7️⃣ Restart deployment (to reload env vars or image) ===
echo -e "${YELLOW}🔁 Restarting deployment '${APP_NAME}'...${NC}"
kubectl rollout restart deployment "$APP_NAME" || echo -e "${YELLOW}⚠️ Deployment may not exist yet.${NC}"

# === 8️⃣ Wait for pods to be ready ===
echo -e "${YELLOW}⏳ Waiting for pods to become ready...${NC}"
kubectl wait --for=condition=ready pod -l app="$APP_NAME" --timeout=180s || true

# === 9️⃣ Show deployment status ===
echo -e "${GREEN}📊 Current cluster status:${NC}"
kubectl get pods
kubectl get svc

# === 🔟 Open the app ===
echo -e "${YELLOW}🌍 Opening app via Minikube service...${NC}"
SERVICE_URL=$(minikube service "$APP_NAME" || true)

if [ -n "$SERVICE_URL" ]; then
  echo -e "${GREEN}✅ App is available at: $SERVICE_URL${NC}"
else
  echo -e "${RED}⚠️ Could not open automatically. Try running:${NC}"
  echo "   minikube service $APP_NAME"
fi

echo -e "${GREEN}🎉 Minikube setup completed successfully!${NC}"

# To RUN:
# ./minikube-setup.sh 
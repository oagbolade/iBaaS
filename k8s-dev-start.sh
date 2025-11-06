#!/bin/bash

set -e

APP_NAME="nextjs-dev"
IMAGE_NAME="nextjs-app:dev"
DEPLOY_FILE="./k8s/deployment-dev.yaml"
DOCKER_FILE="Dockerfile.live.reload"
PORT=4000

echo "🚧 Building Docker dev image..."
docker build -f $DOCKER_FILE -t $IMAGE_NAME .

echo "✅ Docker build complete!"

echo "🚀 Applying Kubernetes deployment..."
kubectl apply -f $DEPLOY_FILE

echo "⏳ Waiting for pod to be ready..."
kubectl rollout status deployment/$APP_NAME

echo "🌐 Starting port-forward to localhost:$PORT ..."

# Keep forwarding active even if k8s restarts pod
while true; do
  kubectl port-forward deploy/$APP_NAME $PORT:$PORT
  echo "🔁 Port-forward lost. Restarting in 2 seconds..."
  sleep 2
done

# Run the following command to start the development environment:
# npm run dev:k8s

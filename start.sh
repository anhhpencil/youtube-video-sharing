#!/bin/sh

if [ "$1" = "web" ]; then
  echo "Running all servers in development mode..."
  docker-compose -f docker-compose.yml up --build
elif [ "$1" = "backend-test" ]; then
  echo "Running tests on each server..."
  docker-compose -f backend/docker-compose.yml -f backend/docker-compose.test.yml up --build
elif [ "$1" = "frontend-test" ]; then
  echo "Running tests on each server..."
  docker-compose -f frontend/docker-compose.yml -f frontend/docker-compose.test.yml up --build
else
  echo "Usage: $0 {web|backend-test|frontend-test}"
  exit 1
fi

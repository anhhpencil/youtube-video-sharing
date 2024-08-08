# Stage 1: Build the React app
FROM node:20 AS build

WORKDIR /app

# Install yarn
RUN npm install -g yarn --force && yarn --version

COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

COPY . .

ARG REACT_APP_PORT
ENV REACT_APP_PORT $REACT_APP_PORT

# Build the app
RUN yarn build
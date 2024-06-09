FROM node:18-alpine

WORKDIR /app

RUN npm install -g npm

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production=false

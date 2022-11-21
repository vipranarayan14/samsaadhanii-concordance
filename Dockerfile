FROM node:18-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

# Install netlify-cli globally to avoid EACCES Permission error 
# when it tries to access /root/.config/netlify/config.json file.
RUN npm install -g netlify-cli@12

RUN npm install

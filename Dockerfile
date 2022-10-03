# javascript docker
FROM node:lts-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY src ./src

EXPOSE 3000

CMD [ "npm", "start" ]
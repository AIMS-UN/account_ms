# javascript docker
FROM node:lts-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
FROM node:8

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY bot.js .
COPY config.json .
COPY commands commands
CMD [ "node", "bot.js" ]
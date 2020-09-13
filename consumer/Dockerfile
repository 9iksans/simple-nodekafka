FROM node:14

COPY package*.json ./

RUN npm install

COPY consumer.js ./
CMD ["node", "consumer.js"] 
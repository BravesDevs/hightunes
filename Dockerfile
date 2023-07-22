FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install -g npm@9.7.2 && npm install

RUN npm run build

CMD ["node", "dist/src/main.js"] 
FROM node:16.16.0-alpine

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json /app

RUN npm install

COPY . /app

CMD ng serve --host 0.0.0.0
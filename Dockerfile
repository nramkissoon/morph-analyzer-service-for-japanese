FROM node:12 AS development

WORKDIR /usr/src/server

RUN apt-get update && apt-get install -y mecab libmecab-dev mecab-ipadic-utf8
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

#######################################################
FROM development AS production

WORKDIR /usr/src/server

EXPOSE 8080

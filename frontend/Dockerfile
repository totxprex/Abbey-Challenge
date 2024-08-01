FROM node:18.17.0 as build

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN npm install

RUN npm install -g react-scripts

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]


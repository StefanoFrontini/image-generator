FROM node:18-bullseye-slim

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm", "start"]


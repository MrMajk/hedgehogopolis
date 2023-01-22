FROM node:16.12

WORKDIR /app/front

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

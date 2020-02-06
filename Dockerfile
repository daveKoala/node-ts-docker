# https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

FROM node:12

# Directory INSIDE the container
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm run build

# If you are building your code for production
# RUN npm ci --only=production
# https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable

COPY . .

EXPOSE 8080
# The CMD line can be over written in teh docker-compose file
CMD [ "node", "src/server.js" ]

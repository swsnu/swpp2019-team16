FROM node:10.16-alpine

COPY build ./build
ADD package*.json yarn.lock ./
COPY index.js ./

RUN yarn add express cors

EXPOSE 80

CMD ["yarn", "start:prod"]
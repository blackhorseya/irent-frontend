FROM node:alpine AS builder-f2e

WORKDIR /app

COPY ./package.json ./
RUN yarn install

ARG DEPLOY_TO=uat

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY ./public ./public
COPY ./src ./src
COPY ./env.${DEPLOY_TO} ./.env
RUN yarn build

FROM nginx:alpine

COPY --from=builder-f2e /app/build/ /usr/share/nginx/html
COPY ./deployments/default.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]

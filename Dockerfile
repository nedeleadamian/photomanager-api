FROM node:16.13-alpine as dist
WORKDIR /tmp/
COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./
COPY src/ src/
RUN yarn install
RUN yarn build

FROM node:16.13-alpine as node_modules
WORKDIR /tmp/
COPY package.json yarn.lock ./
RUN yarn install

FROM node:16.13-alpine
WORKDIR /usr/local/app
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist
COPY package.json ./

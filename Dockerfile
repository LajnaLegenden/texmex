FROM node:14-alpine AS builder
WORKDIR /app
COPY app/package.json ./
COPY app/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY app/. .
RUN yarn build

FROM nginx:1.19-alpine AS server
COPY --from=builder ./app/build /usr/share/nginx/html
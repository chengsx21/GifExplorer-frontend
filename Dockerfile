FROM node:18 AS build

WORKDIR /opt/frontend

RUN yarn config set registry https://registry.npmmirror.com

COPY . .

RUN yarn install

RUN yarn run build

RUN yarn run export

FROM nginx:1.22

WORKDIR /opt/app

COPY --from=build /opt/frontend/out dist

COPY nginx /etc/nginx/conf.d

EXPOSE 80
FROM node:18 AS build

WORKDIR /opt/frontend

COPY . .

RUN yarn install --registry https://registry.npmmirror.com && \
    yarn run build && \
    yarn run export

FROM nginx:1.22

WORKDIR /opt/app

COPY --from=build /opt/frontend/out dist

COPY nginx /etc/nginx/conf.d

EXPOSE 80
FROM node:alpine AS build
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run ng build --prod --aot

FROM httpd:alpine
COPY httpd.conf /usr/local/apache2/conf/
COPY --from=build /app/dist /usr/local/apache2/htdocs
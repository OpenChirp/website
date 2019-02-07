FROM node:alpine AS build
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run ng build --prod --aot

FROM httpd:alpine
COPY --from=build /app/dist /usr/local/apache2/htdocs
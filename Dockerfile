FROM node:alpine AS build
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run ng version
RUN npm run ng build --prod

FROM httpd:alpine
COPY --from=build /app/dist /usr/local/apache2/htdocs
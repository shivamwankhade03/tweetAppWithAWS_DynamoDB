FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN node --max-old-space-size=4096 node_modules/@angular/cli/bin/ng build
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/tweetApp /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx","-g","daemon off;"]
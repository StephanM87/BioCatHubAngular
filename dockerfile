FROM node:12.7-alpine AS build

WORKDIR usr/src/app
COPY . .

RUN npm install 
RUN npm run build


FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/biocathub /usr/share/nginx/html



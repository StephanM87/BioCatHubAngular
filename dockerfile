FROM node:12.7-alpine AS build

WORKDIR usr/src/app
COPY . .
RUN npm install plotly.js-dist
RUN npm install angular-plotly.js plotly.js-dist --save
RUN npm install  @types/plotly.js --save-dev
RUN npm install 
RUN npm build


FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/biocathub /usr/share/nginx/html



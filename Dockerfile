FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx-settings/default.conf /etc/nginx/conf.d/

RUN rm /usr/share/nginx/html/index.html

COPY target/dist /usr/share/nginx/html/

EXPOSE 80
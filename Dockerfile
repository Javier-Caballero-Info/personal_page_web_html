FROM nginx:latest

RUN rm /usr/share/nginx/html/index.html

COPY dist /usr/share/nginx/html/

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx-conf/default.conf /etc/nginx/conf.d/

EXPOSE 80
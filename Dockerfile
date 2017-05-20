FROM nginx:latest

RUN ls /usr/share/nginx/html

RUN rm /usr/share/nginx/html/index.html

COPY index.html /usr/share/nginx/html/

COPY dist/js /usr/share/nginx/html/js
COPY dist/img /usr/share/nginx/html/img
COPY dist/fonts /usr/share/nginx/html/fonts
COPY dist/css /usr/share/nginx/html/css

# Remove the default Nginx configuration file
#RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file from the current directory
#ADD nginx.conf /etc/nginx/

# Append "daemon off;" to the beginning of the configuration
#RUN echo "daemon off;" >> /etc/nginx/nginx.conf


EXPOSE 80
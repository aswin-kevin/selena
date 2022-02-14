FROM devopsedu/webapp
ADD out /var/www/html/
RUN rm /var/www/html/index.html
CMD apachectl -D FOREGROUND
FROM php:8.2-apache

# Railway usa la variable $PORT, no el 80 fijo
ARG PORT
ENV PORT=${PORT:-8080}

# Configurar Apache para que escuche $PORT
RUN sed -i "s/80/$PORT/g" /etc/apache2/ports.conf
RUN sed -i "s/:80/:$PORT/g" /etc/apache2/sites-available/000-default.conf

RUN printf "Listen ${PORT}\n" > /etc/apache2/ports.conf

# Activar mod_rewrite
RUN a2enmod rewrite

# Copiar el proyecto
COPY . /var/www/html/

# Permisos
RUN chown -R www-data:www-data /var/www/html

EXPOSE ${PORT}
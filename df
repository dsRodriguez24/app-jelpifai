FROM php:8.2-apache

# Railway usa la variable PORT desde variables de entorno
ENV PORT=8080

# Configurar Apache para que escuche en cualquier puerto
RUN sed -i 's/80/$PORT/g' /etc/apache2/ports.conf && \
    sed -i 's/:80/:$PORT/g' /etc/apache2/sites-available/000-default.conf

# Activar mod_rewrite
RUN a2enmod rewrite

# Copiar el proyecto
COPY . /var/www/html/

# Permisos
RUN chown -R www-data:www-data /var/www/html && \
    chmod 755 /var/www/html

# Crear script para manejar el PORT dinámico
RUN echo '#!/bin/bash\n\
sed -i "s/^Listen.*/Listen \$PORT/" /etc/apache2/ports.conf\n\
sed -i "s/<VirtualHost.*>/<VirtualHost *:\$PORT>/" /etc/apache2/sites-available/000-default.conf\n\
exec apache2-foreground' > /usr/local/bin/start.sh && \
    chmod +x /usr/local/bin/start.sh

EXPOSE 8080

# Start Apache
CMD ["/usr/local/bin/start.sh"]
FROM wordpress:latest

# Copia o tema personalizado para o diretório correto
COPY ./wp-content/themes/meu_tema /var/www/html/wp-content/themes/meu_tema
COPY ./wp-content/uploads /var/www/html/wp-content/uploads

# Copia arquivos de configuração personalizados do Apache
COPY ./.htaccess /var/www/html/.htaccess
COPY conf/allowoverride.conf /etc/apache2/conf-enabled/allowoverride.conf
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

# Ativa reescrita do Apache
RUN a2enmod rewrite

# Reinicia o Apache quando iniciar
CMD ["apache2-foreground"]

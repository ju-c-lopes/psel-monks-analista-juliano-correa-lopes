FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=wordpress
ENV MYSQL_USER=wpuser
ENV MYSQL_PASSWORD=desafiomonks2025

COPY ./wordpress.sql /docker-entrypoint-initdb.d/

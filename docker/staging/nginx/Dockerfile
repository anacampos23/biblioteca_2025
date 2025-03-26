ARG SHA
ARG PHP_IMAGE=ghcr.io/10code-product/mundo-cardio-php:${SHA}
FROM ${PHP_IMAGE} as php_image

FROM nginx:1.27 AS production

LABEL org.opencontainers.image.source=https://github.com/10code-product/mundo-cardio-back

ARG UID
ARG GID

RUN groupadd -g ${GID} laravel && \
    useradd -M -u ${UID} -g laravel -s /bin/false laravel

RUN mkdir -p /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp && \
    chown -R laravel:laravel /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp && \
    mkdir -p /var/www/html && \
    chown -R laravel:laravel /var/cache/nginx /var/log/nginx /var/run /var/www/html

COPY ./docker/staging/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/staging/nginx/staging.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

COPY --chown=laravel:laravel --from=php_image /var/www/html/ .

USER laravel

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

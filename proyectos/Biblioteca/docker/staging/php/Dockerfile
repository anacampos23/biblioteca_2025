FROM php:8.3.12-fpm-alpine AS composer-stage

ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN apk update && apk add --no-cache \
    && install-php-extensions gd zip exif pcntl intl

COPY --from=composer/composer:2.8.3 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock* ./

RUN composer install \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --no-scripts \
    --no-autoloader

COPY . .

RUN composer install \
    --no-interaction \
    --no-progress \
    --prefer-dist

ARG LARAVEL_ENV_ENCRYPTION_KEY

RUN php artisan env:decrypt --env=staging && \
    cp .env.staging .env

RUN cp .env.staging .env

FROM node:20.12.2-alpine AS frontend-stage

WORKDIR /app

COPY --from=composer-stage /app .

RUN npm install

RUN npm run build

FROM php:8.3.12-fpm-alpine AS production

LABEL org.opencontainers.image.source=https://github.com/10code-product/mundo-cardio-back

ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN apk update && apk add --no-cache \
    jpegoptim \
    optipng \
    pngquant \
    gifsicle \
    libavif \
    ffmpeg \
    && install-php-extensions gd zip exif pdo_mysql redis pcntl opcache intl

COPY --from=frontend-stage /usr/lib /usr/lib
COPY --from=frontend-stage /usr/local/lib /usr/local/lib
COPY --from=frontend-stage /usr/local/include /usr/local/include
COPY --from=frontend-stage /usr/local/bin /usr/local/bin

COPY ./docker/staging/php/staging.ini /usr/local/etc/php/php.ini
COPY ./docker/staging/cron/laravel /var/spool/cron/crontabs/laravel

ARG UID
ARG GID

RUN addgroup -g ${GID} -S laravel && \
    adduser -u ${UID} -S laravel -G laravel && \
    sed -i "s/user = www-data/user = laravel/g" /usr/local/etc/php-fpm.d/www.conf && \
    sed -i "s/group = www-data/group = laravel/g" /usr/local/etc/php-fpm.d/www.conf

RUN mkdir -p /var/www/html && \
    chown -R laravel:laravel /var/www/html

USER laravel

WORKDIR /var/www/html

COPY --chown=laravel:laravel --from=frontend-stage /app .

ARG LARAVEL_ENV_ENCRYPTION_KEY

RUN php artisan config:cache && \
    php artisan storage:link

EXPOSE 9000

CMD ["php-fpm"]

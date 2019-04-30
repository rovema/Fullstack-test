FROM php:7.2-fpm

ENV PATH "$PATH:/root/.composer/vendor/bin"

# Copy composer.lock and composer.json
COPY composer.lock composer.json /var/www/

# Set Working directory
WORKDIR /var/www

# Install dependencies
RUN apt-get update -y && apt-get install -y \
libmcrypt-dev \
zlib1g-dev \
libpq-dev \
openssl \
unzip \
curl \
ssh \
vim \
zip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo pdo_pgsql mbstring zip bcmath
RUN pecl install mcrypt-1.0.2
RUN docker-php-ext-enable mcrypt

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install composer packages
RUN composer global require hirak/prestissimo

# Copy existing application directory contents
COPY . /var/www

# Change current user to root
USER root

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD php-fpm


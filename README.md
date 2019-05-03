# Rovema/Fullstack-test - Rafael Brasil

----
## PROJETO
Sistema web que possibilita fazer o cadastro de livros (criar, visualizar, editar, apagar) e por meio de autenticação acessar estante de livros.

----
## TECNOLIGIAS
* [PHP](https://www.php.net/)
* [Laravel](https://laravel.com/)
* [Laravel-excel](https://docs.laravel-excel.com/3.1/getting-started/)
* [Postgres](https://www.postgresql.org/)


----
## COMO RODAR
1. Clone ou baixe o repositorio.
2. Entre na pasta do projeto.
3. Adicione o arquivo env.
```
cp .env.example .env
```
4. Execute o comando para buildar a imagem e iniciar o container.
```
docker-compose up --build -d
```
5. Execute os comando para instalar dependencias necessarias.
```
docker exec -it test_app_1 composer install
```
6. Execute os comandos para garantir permissão necessaria para acessar o aplicativo.
```
docker exec -it test_app_1 chmod 0777 -R bootstrap/cache
docker exec -it test_app_1 chmod 0777 -R storage
```
7. Gere a chave da aplicação.
```
docker exec -it test_app_1 php artisan key:generate
```
7. Rode as migration.
```
docker exec -it test_app_1 php artisan migrate
```
8. Acesse o aplicativo: [localhost](http://127.0.0.1)

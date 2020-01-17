
# Teste Grupo Rovema - Magno Carvalho

  

[![Build Status](https://travis-ci.org/magnocarvalho/Fullstack-test.svg?branch=magno-carvalho)](https://travis-ci.org/magnocarvalho/Fullstack-test) [Currículo atualizado](https://github.com/magnocarvalho/tcc/raw/master/docs/Curriculum-MagnoCarvalhoDosSantos%20(2).pdf)

  

O teste foi publicado no link [https://rovema-magno.herokuapp.com/](https://rovema-magno.herokuapp.com/)

  

Deploy da imagem e testes unitários pode ser conferidos seus logs no link [https://travis-ci.org/magnocarvalho/Fullstack-test](https://travis-ci.org/magnocarvalho/Fullstack-test)

  

Tasks foram organizadas no [kanbam](https://github.com/magnocarvalho/Fullstack-test/projects/1), dentro do proprio projeto no github.

  

Organização do padrão de escrita do código foi utilizado a biblioteca [Prettier](https://prettier.io/)

## Arquitetura da aplicação MEAN STACK

  

Software foi desenvolvido utilizando o conceito MEAN STACK, utilizando um conjunto de tecnologias OPEN SOURCE, que interagem em PILHA conforme a ilustração abaixo.

![MEAN](https://raw.githubusercontent.com/magnocarvalho/tcc/master/docs/images/image9.png)

[Sobre o conceito MEAN STACK](https://www.mongodb.com/blog/post/the-modern-application-stack-part-1-introducing-the-mean-stack)

  

| Tecnologia | Documentação | Versão |
| ------ | ------ | ------ |
| Angular 8 | [https://angular.io/docs](https://angular.io/docs) | 8.3.14 |
| NodeJS | [https://nodejs.org/pt-br/docs](https://nodejs.org/pt-br/docs/) | 10.16.1 |
| ExpressJS | [https://expressjs.com/](https://expressjs.com/) | 4.17.1 |
| MongoDB | [https://docs.mongodb.com/manual/](https://docs.mongodb.com/manual/) | 4.2 |

## MongoDB 

Banco de dados foi criado em ambiente [MONGO ATLAS](https://docs.atlas.mongodb.com/getting-started/) 

![Diagrama do banco mongo](https://raw.githubusercontent.com/magnocarvalho/Fullstack-test/magno-carvalho/docs/diagram-mongoDB.PNG)


## Segurança

Para a autenticação dos usuários cadastrados foi utilizado implementação do protocolo de segurança OAuth, utilizando o serviço do [Firebase Auth](https://firebase.google.com/docs/auth/?authuser=0), todo processo ocorre como na ilustração abaixo.

![Firebase](https://jainamit333.files.wordpress.com/2017/08/oauth_implicit.png)

[Fonte](https://jainamit333.wordpress.com/2017/08/05/add-google-authentication-using-firebase-in-reactredux-application/)

## Docker

  

Criar a imagem Docker execute o comando a seguir

  

```bash

$ docker build -t magnos .

```

Para executar a aplicação utilizando Docker exulte o comando abaixo

  

```bash

$ docker run -p 80:1337 -d magnos

```

Executar o conjunto de teste

  

```bash

$ mocha ./test/test.js --timeout 10000

```

  

## Pipeline de CI

  

#### Fluxo de publicação automatizado

  

[GitHub](https://github.com/): Repositório do código acionado após acontecer o push de novos arquivo, notificando o serviço do Travis CI.

[Travis CI](https://travis-ci.com/): Travis executar os testes e criar o código para produção.

[Heroku](https://www.heroku.com/): Executa o código automaticamente após os testes/compilação forem aprovados com sucesso no travis-cli.

  

![Fluxo de publicação automatizado](https://miro.medium.com/max/739/1*ttsZACmqa4SJRENqllm0og.png)

  

## Ambiente DEV sem Dockek

Instalação do ambiente de desenvolvimento sem utilizar Docker siga os passos abaixo.

#### Instalar dependências globais

```bash

$ npm i -g typescript@3.5.2 tslint mocha chai-http chai gulp-cli @angular/cli@8.3.21 @angular/animations@^8.2.14

```

  

#### Instalação das dependências da API

  

```bash

$ npm i --save -d

```

  

#### Instalação das dependências do FRONT

  

```bash

$ cd front/

$ npm i --save -d

```

  

#### Execultando API

  

Execute o comando `npm run dev` na raiz do projeto para inciar o servidor em modo DEV. Navegue para `http://localhost:1337/`.

  

#### Executando FRONT

  

Execute o comando `ng serve` na pasta `front` para inciar o servidor em modo dev. Navegue para `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

  

#### Banco de dados

  

Url de acesso ao banco de dados deve ser informado no environment do ambiente a exemplo do das linhas que contem o `ENV` no arquivo `Dockerfile` com a chave `MONGODB_URI`
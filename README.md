# Teste Rovema Magno

O teste Full stack publicado no link 
[https://rovema-magno.herokuapp.com/](https://rovema-magno.herokuapp.com/)

## Instalação modo de desenvolvimento

Aplicação usa [Node.js na versão 10](https://nodejs.org/fr/blog/release/v10.0.0/) 
Front and usa [Angular CLI](https://github.com/angular/angular-cli) versão 8.3.21 

#### Instalar dependências globais 

```bash
$ npm i -g caniuse-lite browserslist@latest typescript@3.5.2 tslint mocha chai-http chai gulp-cli @angular/cli@8.3.21 @angular/animations@^8.2.14 

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


#### Development API 

Execute o comando `npm run dev` na raiz do projeto para inciar o servidor em modo dev. Navegue para `http://localhost:1337/`. 

#### Development FRONT 

Execute o comando `ng serve` na pasta `front` para inciar o servidor em modo dev. Navegue para `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.
# Full Stack no Grupo Rovema
Somos uma empresa que atua em vários segmentos de mercado, com diferentes tecnologias, culturas e desafios. Por isso, gostamos de compor nossos times com profissionais multidisciplinares, que tenham alta capacidade de aprendizado, sejam detalhistas, resiliêntes, questionadores e curiosos. Você, como **Full Stack Developer**, será o responsável por implementar, dar manutenção, aplicar correções e propor soluções em projetos de software, baseadas em **Containers Docker** sempre buscando a melhor composição de tecnologias para cada cenário.

## Orientações
Para executar o desafio de **Full Stack Developer**, você **poderá utilizar qualquer liguagem de programação, framework ou biblioteca e banco de dados** que for **confortável para você**, seguindo o [passo-a-passo](https://github.com/rovema/fullstack-test#etapas) para a execução, atendendo aos [critérios de aceitação](https://github.com/rovema/fullstack-test#crit%C3%A9rios-de-aceita%C3%A7%C3%A3o). 

## Desafio
Você é o responsável por construir uma **Estante de livros**, com os seguintes requisitos:

- Como leitor, desejo cadastrar um livro, contendo **título**, **descrição**, **foto** e **status** de **Lido** e **Não Lido**.
- Como leitor, desejo cadastrar livros com o status de **Não Lido** por padrão.
- Como leitor, desejo editar um livro cadastrado.
- Como leitor, desejo remover um livro da minha estante.
- Como leitor, desejo visualizar uma lista de livros cadastrados.
- Como leitor, desejo filtrar os livros cadastrados por **título** e **status**.
- Como leitor, desejo exportar a lista de livros cadastrados para formato **.csv**, contendo **título** e **status**.
- Como leitor, desejo acessar minha estante através de login e senha.

## Etapas

#### 1 - Fazer um fork desse repositório
![https://i.imgur.com/7sVXPcu.png](https://i.imgur.com/7sVXPcu.png)


#### 2 - Criar um branch com o seu primeiro e último nome
```bash
git checkout -b joao-silva
```

#### 3 - Escreva a documentação da sua aplicação
Crie uma pasta na raíz da aplicação chamada **docs/** contendo o a **modelagem entidade-relacionamento** (em imagem ou pdf) da sua aplicação. Você deve também, substituir o conteúdo do arquivo **README.md** e escrever a documentação da sua aplicação, com os seguintes tópicos: 
- **Projeto**: Descreva o projeto e como você o executou. Seja objetivo.
- **Tecnologias**: Descreva quais tecnologias foram utilizadas, enumerando versões (se necessário) e os links para suas documentações, bem como, qual guia de estilos de código você utilizou com o link para a sua documentação.
- **Como rodar**: Descreva como iniciar a sua aplicação, utilizando **Docker** e **Docker Compose**.

#### 4 - Faça uma Pull Request
Após implementada a solução, crie uma [pull request](https://github.com/rovema/fullstack-test/pulls) com o seu projeto para esse repositório.

## Critérios de Aceitação
Para que seu teste tenha o mínimo necessário que atenda aos requisitos esperados, ele deve:
- Atender ao que foi proposto no [Desafio](https://github.com/rovema/fullstack-test#Desafio).
- Ter documentação de aplicação e modelos de banco de dados.
- Manter uma estrutura de aplicação concisa e coerente. (Simples é melhor que complexo)
- Sua aplicação e banco de dados devem conter uma implementação como container Docker.
- Código escrito com base em algum padrão de convenções (style guide) da linguagem que está utilizando. Ex: Em Python, temos o [pep8](https://www.python.org/dev/peps/pep-0008/), em PHP temos a [PSR2](https://www.php-fig.org/psr/psr-2/), em JavaScript temos [AirBnB Standards](https://github.com/airbnb/javascript) e o [Javascript Standards](https://standardjs.com/), etc.
- Utilizar padrões semânticos em mensagens de commit. (Gostamos do padrão de commits do repositório [AngularJS](http://karma-runner.github.io/3.0/dev/git-commit-msg.html))


## Dicas e Informações Valiosas

#### O que gostaríamos de ver em seu teste:
- Testar ele localmente com docker e validar o **CRUD** de livros.
- Se possível, que seu teste estivesse hospedado em algum lugar. (Gostamos do [Heroku](https://www.heroku.com/)).
- Convenção de nome em classes, objetos, variáveis, métodos e etc.
- Um planejamento de entrega das tarefas do seu desafio. (Gostamos de [Kanban](https://blog.runrun.it/o-que-e-kanban/)).
- Que sua estrutura de linguagem e tecnologias seja compatível com ambiente Linux.
- Testes unitários.

**Observação:** Nenhum dos itens acima é obrigatório.

#### O que não gostaríamos de ver no seu teste:
- Saber que não foi você quem implementou.
- Processos manuais de inicialização da aplicação e banco de dados.
- Falta de organização de código.
- Falta de documentação.
- Histórico de commits desorganizado e despadronizado.

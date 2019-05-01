Projeto:
	Através do comando "rails new estante-livros" a framework gerou todas as pastas e 
organiza minhas estruturas MVC;
	Configurei minha base de dados através do documento chamado database.yml com a configuração
do Docker e rodei o comando "rails db:create;
	Criei minhas tabelas do banco e as suas dependências conforme o modelo de base criado no 
DBdesigner;
	Gerei meus scaffolds, com isso foi criado as minhas controllers/models/views e rotas logo após sendo configuradas e validadas, com isso dei o comando "rails db:migrate" migrando assim para o meu banco de dados;
	Fiz a autenticação de usuário para logar no sistema e cadastras os livros e a estante que ela pertence;
	Coloquei um template básico para mudar o visual do meu sistema;
	Trabalhei com uma biblioteca para poder manipular os arquivos de imagens;

Tecnologias:
	Ruby version: 2.6;
	Rails version: 5.2;
	banco de dados: Postgresql 0.18
	gem 'devise' para autenticação dos usuários;
	Bootstrap version: 4.3.1
	gem 'carrierwave' e 'mini-magick' para manipulação de arquivos e imagens;
	https://onebitcode.com/fazendo-upload-de-imagem-e-multiplos-anexos-usando-carrierwave/
	Docker version: 18.09
	https://rubygems.org/
	https://guides.rubyonrails.org/
	http://guides.railsgirls.com/guides-ptbr/devise
	
Como rodar:
	Docker build 
	Docker ps 



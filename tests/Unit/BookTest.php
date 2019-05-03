<?php

namespace Tests\Unit;

use Tests\TestCase;

class BookTest extends TestCase
{
    /**
     * Testa o index.
     *
     * @return void
     */
    public function testIndex()
    {
        $this->visit('/')
            ->see('Bookshelf')
            ->see('Pesquisar')
            ->see('Livros Cadastrados');

    }

    /**
     *  Teste create
     *
     * @return void
     */
    public function testCreate()
    {
        $this->visit('/books/create')
            ->see('Novo Livro')
            ->see('Descrição')
            ->see('Foto');
    }

    /**
     * Testa o link que leva a página de criação
     *
     * @return void
     */
    public function testCreateLink()
    {
        $this->visit('/')
            ->click('Novo Livro')
            ->seeRouteIs('books.create');
    }

    /**
     * Testa o link que leva a página de login
     *
     * @return void
     */
    public function testLoginLink()
    {
        $this->visit('/')
            ->click('Login')
            ->seeRouteIs('login');
    }

    /**
     * Testa os erros da pagina de criaçãoo
     *
     * @return void
     */
    public function testCreateError()
    {
        $this->visit('/books/create')
            ->press('Salvar')
            ->see('O campo title é obrigatório.')
            ->see('O campo description é obrigatório.')
            ->see('O campo photo é obrigatório');
    }
}

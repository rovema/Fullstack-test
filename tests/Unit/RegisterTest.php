<?php

namespace Tests\Unit;

use Tests\TestCase;

class RegisterTest extends TestCase
{
    /**
     * Testa o index.
     *
     * @return void
     */
    public function testIndex()
    {
        $this->visit('/register')
            ->see('Bookshelf')
            ->see('Voltar á página inicial')
            ->see('Crie sua conta')
            ->see('Registrar');
    }

    /**
     * Testa os erros do registro
     *
     * @return void
     */
    public function testError()
    {
        $this->visit('/register')
            ->press('Registrar')
            ->see('O campo name é obrigatório.')
            ->see('O campo email é obrigatório.')
            ->see('O campo password é obrigatório.');
    }

    /**
     * Testa o link da página inical.
     *
     * @return void
     */
    public function testPaginaInicialLink()
    {
        $this->visit('/register')
            ->click('Voltar á página inicial')
            ->seeRouteIs('home');
    }
}

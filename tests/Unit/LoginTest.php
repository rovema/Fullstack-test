<?php

namespace Tests\Unit;

use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * Testa o index.
     *
     * @return void
     */
    public function testIndex()
    {
        $this->visit('/login')
            ->see('Bookshelf')
            ->see('Voltar á página inicial')
            ->see('Login');
    }

    /**
     * Testa os erros do login
     *
     * @return void
     */
    public function testError()
    {
        $this->visit('/login')
            ->press('Entrar')
            ->see('O campo email é obrigatório.')
            ->see('O campo password é obrigatório.');
    }

    /**
     * Testa o link de registro;
     *
     * @return void
     */
    public function testRegisterLink()
    {
        $this->visit('/login')
            ->click('Não tem uma conta?')
            ->seeRouteIs('register');
    }

    /**
     * Testa o link da página inical.
     *
     * @return void
     */
    public function testPaginaInicialLink()
    {
        $this->visit('/login')
            ->click('Voltar á página inicial')
            ->seeRouteIs('home');
    }
}

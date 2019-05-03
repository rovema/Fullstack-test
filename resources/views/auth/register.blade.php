@extends('layout.master', ['login' => true])

@section('styles')
    <link href="{{ asset('css/sigin.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div class="account-container register">
        <div class="content clearfix">
            <form action="{{ route('register') }}" method="post">
                @csrf
                <h1>Crie sua conta</h1>
                <div class="login-fields">
                    <div class="field">
                        <label for="nome">Nome</label>
                        <input type="text" id="name" name="name" value="" placeholder="Nome" class="login" />
                    </div>
                    <div class="field">
                        <label for="email">Email</label>
                        <input type="text" id="email" name="email" value="" placeholder="Email" class="login"/>
                    </div>
                    <div class="field">
                        <label for="password">Senha</label>
                        <input type="password" id="password" name="password" value="" placeholder="Senha" class="login"/>
                    </div>
                    <div class="field">
                        <label for="password_confirmation">Confirme a senha</label>
                        <input type="password" id="password_confirmation" name="password_confirmation" value="" placeholder="Confirme a senha" class="login"/>
                    </div>
                </div>
                <div class="login-actions">
                    <button class="button btn btn-primary btn-large">Registrar</button>
                </div>
            </form>
        </div>
    </div>
@endsection

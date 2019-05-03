@extends('layout.master', ['login' => true])

@section('styles')
    <link href="{{ asset('css/sigin.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div class="account-container">
        <div class="content clearfix">
            <form action="{{ route('login') }}" method="post">
                @csrf
                <h1>Login</h1>
                <div class="login-fields">
                    <div class="field">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="" placeholder="Email" class="login username-field" />
                    </div>
                    <div class="field">
                        <label for="password">Senha</label>
                        <input type="password" id="password" name="password" value="" placeholder="Senha" class="login password-field"/>
                    </div>
                </div>
                <div class="login-actions">
                    <span class="login-checkbox">
                        <a href="{{ route('register') }}">Não tem uma conta?</a>
                    </span>
                    <button class="button btn btn-success btn-large">Entrar</button>
                </div>
            </form>
        </div>
    </div>
@endsection

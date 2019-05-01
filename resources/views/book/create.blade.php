@extends('layout.master')

@section('breadcrumb')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="{{ route('home') }}">Livros</a>
        </li>
        /
        <li class="breadcrumb-item active">Novo livro</li>
    </ol>
@endsection


@section('content')
    <div class="widget">
        <div class="widget-header">
            <h3>Novo Livro</h3>
        </div>
        <div class="widget-content">
            <form action="{{ route('books.store') }}" method="POST" class="form-horizontal">
                {{ csrf_field() }}
                <fieldset>
                    <div class="control-group">
                        <label class="control-label" for="title">Título</label>
                        <div class="controls">
                            <input class="span9" type="text" id="title" name="title">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="description">Descrição</label>
                        <div class="controls">
                            <textarea class="span9" name="description" id="description" cols="30" rows="10"></textarea>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="photo">Foto</label>
                        <div class="controls">
                            <a class="btn" href="#">escolher arquivo</a>
                            <p class="help-block">Tipos aceitos, tamanho maximo do arquivo.</p>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button class="btn btn-primary" type="submit">Salvar</button>
                        <a class="btn pull-right" href="{{ route('home') }}">Cancel</a>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
@endsection

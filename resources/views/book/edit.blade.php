@extends('layout.master')

@section('breadcrumb')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="{{ route('home') }}">Livros</a>
        </li>
        /
        <li class="breadcrumb-item active">Editar livro {{ $book->id }}</li>
    </ol>
@endsection


@section('content')
    <div class="widget">
        <div class="widget-header">
            <h3>Livro {{ $book->id }}</h3>
        </div>
        <div class="widget-content">
            <form action="{{ route('books.update', $book->id) }}" method="POST" class="form-horizontal" enctype="multipart/form-data">
                @method('PATCH')
                @include('book._form')
            </form>
        </div>
    </div>
@endsection

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
            <form action="{{ route('books.store') }}" method="POST" class="form-horizontal" enctype="multipart/form-data">
                @include('book._form')
            </form>
        </div>
    </div>
@endsection

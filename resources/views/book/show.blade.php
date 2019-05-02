@extends('layout.master')

@section('breadcrumb')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="{{ route('home') }}">Livros</a>
        </li>
        /
        <li class="breadcrumb-item active">livro {{ $book->id }}</li>
    </ol>
@endsection

@section('content')
    <div class="widget">
        <div class="widget-header">
            <h3>{{ $book->title }}</h3>
            @auth
                <a  class="pull-right" href="#" style="margin-right: 42px;">Adicionar a estante</a>
            @endauth
        </div>
        <div class="widget-content">
            <img src="{{ url('storage/books/'.$book->photo) }}" alt="{{ $book->title }}" style=" display: block;  margin-left: auto;  margin-right: auto;  width: 15%;">
            <dl>
                <dd style="text-align: justify">{{ $book->description }}</dd>
            </dl>
        </div>
    </div>
@endsection

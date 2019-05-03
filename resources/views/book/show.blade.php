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
    @auth
        @if(!$isInBookCase)
            <form action="{{ route('bookcase.store') }}" method="POST">
            @csrf
            <button type="submit" class="pull-right btn-link" style="margin-right: 10px; margin-bottom: 10px;padding: 0; border: none; background: none; color: #19bc9c;">Adicionar a estante</button>
            <input type="hidden" name="id" value="{{ $book->id }}">
        </form>
        @endif
    @endauth
    <div class="widget">
        <div class="widget-header">
            <h3>{{ $book->title }}</h3>
        </div>
        <div class="widget-content">
            <img src="{{ url('storage/books/'.$book->photo) }}" alt="{{ $book->title }}" style=" display: block;  margin-left: auto;  margin-right: auto;  width: 15%;">
            <dl>
                <dd style="text-align: justify">{{ $book->description }}</dd>
            </dl>
        </div>
    </div>
@endsection

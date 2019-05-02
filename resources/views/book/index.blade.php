@extends('layout.master')

@section('content')
    @include('layout.errors')
    <div class="widget widget-table action-table">
        <div class="widget-header"> <i class="icon-th-list"></i>
            <h3>Livros Cadastrados</h3>
            <a  class="pull-right" href="{{ route('books.create') }}" style="margin-right: 42px;">Novo Livro</a>
        </div>
        @if($books->isNotEmpty())
        <div class="widget-content">
            <table class="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Titulo</th>
                    <th>Descricao</th>
                    <th class="td-actions" width="210px;"></th>
                </tr>
                </thead>
                @foreach($books as $book)
                    <tbody>
                        <tr>
                            <td>
                                <img class="zoom" src="{{ url('storage/books/'.$book->photo) }}" alt="{{ $book->title }}" height="50" width="50">
                            </td>
                            <td>{{ \Str::limit($book->title, 80) }}</td>
                            <td>{{ \Str::limit($book->description, 80) }}</td>
                            <td>
                                <div class="btn-group">
                                    <a class="btn" href="{{ route('books.show', $book->id) }}">Visualizar</a>
                                    <a class="btn btn-primary" href="{{ route('books.edit', $book->id) }}">Editar</a>
                                    <form action="{{ route('books.destroy', ['id' => $book->id]) }}" method="POST">
                                        @method('DELETE')
                                        @csrf
                                        <button type="submit" class="btn btn-danger">Apagar</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                @endforeach
            </table>
        </div>
        @else
            <h1></h1>
            <div class="alert">
                Nenhum livro cadastrado.
            </div>
        @endif
    </div>
@endsection

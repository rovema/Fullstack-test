@extends('layout.master')

@section('content')
    <div class="widget widget-table action-table">
        <div class="widget-header"> <i class="icon-th-list"></i>
            <h3>Livros Cadastrados</h3>
            <a  class="pull-right" href="{{ route('books.create') }}" style="margin-right: 42px;">Novo Livro</a>
        </div>
        <div class="widget-content">
            <table class="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Descricao</th>
                    <th class="td-actions"></th>
                </tr>
                </thead>
                @foreach($books as $book)
                    <tbody>
                        <tr>
                            <td>{{ $book->title }}</td>
                            <td>{{ $book->description }}</td>
                            <td>
                                EDIT/DELETE
                            </td>
                        </tr>
                    </tbody>
                @endforeach
            </table>
        </div>
    </div>
@endsection

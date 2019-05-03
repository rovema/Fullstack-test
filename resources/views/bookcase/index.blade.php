@extends('layout.master')

@section('content')
    <div class="widget widget-table action-table">
        <div class="widget-header"> <i class="icon-th-list"></i>
            <h3>Meus Livros</h3>
        </div>
        @if($bookcase->isNotEmpty())
            <div class="widget-content">
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Imagem</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Visualizado</th>
                        <th class="td-actions" width="160px;"></th>
                    </tr>
                    </thead>
                    @foreach($bookcase as $case)
                        <tbody>
                        <tr>
                            <td>
                                <img class="zoom" src="{{ url('storage/books/'.$case->book->photo) }}" alt="{{ $case->book->title }}" height="50" width="50">
                            </td>
                            <td>{{ \Str::limit($case->book->title, 80) }}</td>
                            <td>{{ \Str::limit($case->book->description, 80) }}</td>
                            <td>{{ $case->status == false ? 'Não' : 'Sim' }}</td>
                            <td>
                                <div class="btn-group" style="margin-top: 10px;">
                                    <button type="submit" class="btn" form="update">Visualizar</button>
                                    <button type="submit" class="btn btn-danger" form="destroy">Remover</button>
                                </div>

                                <form action="{{ route('bookcase.update', $case->id) }}" method="POST" id="update">
                                    @method('PATCH')
                                    @csrf
                                    <input type="hidden" name="idBook" value="{{ $case->book->id }}">
                                </form>
                                <form action="{{ route('bookcase.destroy', $case->id) }}" method="POST" id="destroy">
                                    @method('DELETE')
                                    @csrf
                                    <input type="hidden" name="idBook" value="{{ $case->book->id }}">
                                </form>
                            </td>
                        </tr>
                        </tbody>
                    @endforeach
                </table>
            </div>
        @else
            <h1></h1>
            <div class="alert">
                Nenhum livro adicionado a estante.
            </div>
        @endif
    </div>
@endsection

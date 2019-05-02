@csrf
<fieldset>
    <div class="control-group">
        <label class="control-label" for="title">Título</label>
        <div class="controls">
            <input class="span9" type="text" id="title" name="title" value="{{ isset($book) ? $book->title : '' }}">
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="description">Descrição</label>
        <div class="controls">
            <textarea class="span9" name="description" id="description" cols="30" rows="10">{{ isset($book) ? $book->description : '' }}</textarea>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="photo">Foto</label>
        <div class="controls">
            <input name="photo" type="file">
            @if(isset($book) && $book->photo != null)
                <hr>
                <p class="help-block">Imagem atual.</p>
                <img src="{{ url('storage/books/'.$book->photo) }}" alt="{{ $book->title }}" style="max-width: 1000px;">
            @endif
        </div>

    </div>

    <div class="form-actions">
        <button class="btn btn-primary" type="submit">
            {{ \Route::current()->getName() == 'books.edit' ? 'Atualizar' : 'Salvar' }}
        </button>
        <a class="btn pull-right" href="{{ route('home') }}">Cancelar</a>
    </div>
</fieldset>

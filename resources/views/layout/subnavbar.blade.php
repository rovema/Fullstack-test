<div class="subnavbar">
    <div class="subnavbar-inner">
        <div class="container">
            <ul class="mainnav">
                <li class="{{ Route::current()->getName() != 'bookcase.index' ? 'active' : '' }}"><a href="{{ route('home') }}"><i class="fa fa-book" aria-hidden="true"></i><span>Livros</span> </a> </li>
                @auth
                    <li class="{{ Route::current()->getName() == 'bookcase.index' ? 'active' : '' }}"><a href="{{ route('bookcase.index') }}"><img src="{{ asset('fonts/bookshelf.ico') }}" class="fa" alt="bookshelf" width="24px" height="24px" style="margin-top: 10px;"><span>Estante</span> </a> </li>
                @endauth
            </ul>
        </div>
    </div>
</div>

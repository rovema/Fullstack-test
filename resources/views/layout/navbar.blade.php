<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            @auth
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
            @endauth
            <a  href="{{ route('home') }}" class="brand" href="index.html">{{ config('app.name') }} </a>

            @guest
                @if(Route::current()->getName() != 'login' && Route::current()->getName() != 'register')
                    <a href="{{ route('login') }}" class="pull-right" style="margin-top: 10px;color: white; text-decoration: none;">
                        <i class="fa fa-sign-in"></i>
                        Login
                    </a>
                @else
                        <div class="nav-collapse">
                            <ul class="nav pull-right">
                                <li class="">
                                    <a href="{{ route('home') }}" class="">
                                        <i class="icon-chevron-left"></i>
                                        Voltar á página inicial
                                    </a>
                                </li>
                            </ul>
                        </div>
                    @endif
            @endguest
            @auth
                <div class="nav-collapse">
                    <ul class="nav pull-right">
                        <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i
                                    class="fa fa-user"></i> {{ Auth()->user()->name }}<b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="{{ route('logout') }}">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            @endauth
        </div>
    </div>
</div>

<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name') }}</title>
    <meta name="author" content="Rafael Brasil">

    {{-- Styles --}}
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/font-awesome.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap-responsive.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/base.css') }}" rel="stylesheet">
    @yield('styles')

    {{-- Scripts --}}
    <script src="{{ asset('js/app.js') }}" defer></script>
</head>
<body>
    @if(isset($login))
        @include('layout.navbar')
    @else
        @include('layout.navbar')
        @include('layout.subnavbar')
    @endif

    @yield('breadcrumb')

    <div class="main">
        <div class="main-inner">
            <div class="container">
                <div class="row">
                    <div class="span12">
                        @yield('content')
                        @include('layout.errors')
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('layout.footer')
</body>
</html>

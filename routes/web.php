<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'BookController@index')->name('home');
Route::get('/export', 'BookController@export')->name('books.export');
Route::resource('books', 'BookController');

Route::get('bookcase/export', 'BookCaseController@export')->name('bookcase.export');
Route::resource('bookcase', 'BookCaseController')->only(['index', 'store', 'update', 'destroy']);

Route::get('logout', 'Auth\LoginController@logout')->name('logout');
Auth::routes();

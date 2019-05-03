<?php

namespace App\Http\Controllers;

use App\BookCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookCaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bookcase = BookCase::all()->where('id_user', Auth::user()->id);

        return view('bookcase.index', compact('bookcase'));
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $bookcase = BookCase::findOrFail($id);

        dump($id);
        dd($request->idBook);

        if ($bookcase->status == false) {
            $bookcase->status = true;
            $bookcase->save();
        }

        return redirect()->route('books.show', $request->idBook);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        BookCase::create([
           'id_book' => $request->id,
            'id_user' => Auth::user()->id
        ]);

        return redirect()->route('bookcase.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        BookCase::destroy($id);

        return redirect()->route('bookcase.index');
    }
}

<?php

namespace App\Http\Controllers;

use App\BookCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\BookCaseExport;

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

        if(Request()->filled('q')){
            $status = Request('q') == 1 ? true : false;
            $bookcase = $bookcase->where('status', $status);
        }

        if(Request()->filled('clear')) {
            $bookcase = BookCase::all()->where('id_user', Auth::user()->id);
        }

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

    /**
     * Export to csv
     */
    public function export()
    {
        return Excel::download(new BookCaseExport, 'estante.csv');
    }
}

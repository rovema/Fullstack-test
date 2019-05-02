<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = Book::all();

        return view('book.index', compact('books'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('book.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|unique:books|max:255',
            'description' => 'required',
            'photo' => 'required|image'
        ]);

        $fileName = "{$validatedData['title']}.{$request->photo->extension()}";
        $validatedData['photo'] = $fileName;

        try {
            \DB::transaction(function() use ($validatedData, $fileName, $request){
                Book::create($validatedData);
                $request->photo->storeAs('books', $fileName);
            });
        } catch (\Exception $err) {
            return redirect()->route('books.index')->withErrors(['error' => $err->getMessage()]);
        }

        return redirect()->route('books.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $book = Book::FindOrFail($id);

        return view('book.show', compact('book'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $book = Book::FindOrFail($id);

        return view('book.edit', compact('book'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $book = Book::FindOrFail($id);

        $validatedData = $request->validate([
            'title' => 'required|unique:books|max:255',
            'description' => 'required',
            'photo' => 'required|image'
        ]);

        $fileName = "{$validatedData['title']}.{$request->photo->extension()}";
        $validatedData['photo'] = $fileName;

        $book->fill($validatedData);

        try {
            \DB::transaction(function() use ($book, $fileName, $request){
                $book->save();
                $request->photo->storeAs('books', $fileName);
            });
        } catch (\Exception $err) {
            return redirect()->route('books.index')->withErrors(['error' => $err->getMessage()]);
        }

        return redirect()->route('books.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Book::destroy($id);

        return redirect()->route('books.index');
    }
}
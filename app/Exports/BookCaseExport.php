<?php
namespace App\Exports;

use App\BookCase;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromCollection;

class BookCaseExport implements FromCollection
{
    /**
     * @return array|\Illuminate\Support\Collection
     */
    public function collection()
    {
        return BookCase::join('books', 'book_cases.id_book', 'books.id')
                        ->select('title', 'status')
                        ->where('id_user', Auth::user()->id)
                        ->get();
    }
}

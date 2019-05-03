<?php
namespace App\Exports;

use App\Book;
use Maatwebsite\Excel\Concerns\FromCollection;

class BookExport implements FromCollection
{
    /**
     * @return array|\Illuminate\Support\Collection
     */
    public function collection()
    {
        return Book::select('title')->get();
    }
}

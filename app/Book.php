<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'photo'
    ];

    /**
     * @param $userId
     * @param $bookId
     * @return bool
     */
    public function isInBookCase($userId, $bookId)
    {
        return $this->join('book_cases', 'books.id', 'book_cases.id_book')
                    ->where('books.id', $bookId)
                    ->where('book_cases.id_user', $userId)
                    ->get()
                    ->count() > 0;
    }
}

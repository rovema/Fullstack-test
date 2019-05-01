json.extract! book, :id, :title, :description, :photo, :status, :bookcase_id, :user_id, :created_at, :updated_at
json.url book_url(book, format: :json)

Rails.application.routes.draw do
  resources :books
  resources :bookcases
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'books#index'
  get "book/removed/:id", to:"books#destroy", as: "delete_the_book"
  get "bookcase/removed/:id", to:"bookcases#destroy", as: "delete_the_bookcases"
  get 'consult_book/:id', to: "books#consult_book"
end

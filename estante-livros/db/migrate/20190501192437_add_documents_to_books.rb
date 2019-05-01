class AddDocumentsToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :documents, :json
  end
end

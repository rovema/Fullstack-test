class RemovePhotoFromBooks < ActiveRecord::Migration[5.2]
  def change
    remove_column :books, :photo, :string
  end
end

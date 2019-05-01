class AddAvatarToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :avatar, :string
  end
end

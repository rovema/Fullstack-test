class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :description
      t.string :photo
      t.boolean :status
      t.references :bookcase, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

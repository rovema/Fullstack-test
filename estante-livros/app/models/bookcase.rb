class Bookcase < ApplicationRecord
  belongs_to :book, dependent: :destroy
  belongs_to :user
  validates :name, :description, presence: true

  def to_s
    description
  end
end

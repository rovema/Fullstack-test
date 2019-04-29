class Book < ApplicationRecord
  belongs_to :user
  belongs_to :bookcase
  validates :title, :description, presence: true

  def to_s
    description
  end
end

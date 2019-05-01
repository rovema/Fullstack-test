class Book < ApplicationRecord
  belongs_to :user
  belongs_to :bookcase
  validates :title, :description, presence: true
  has_one_attached :image

  mount_uploader :avatar, AvatarUploader
  mount_uploaders :documents, DocumentUploader

  def to_s
    description
  end
end

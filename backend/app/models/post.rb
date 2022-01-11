class Post < ApplicationRecord
  belongs_to :user, optional: true

  has_many :post_categories, dependent: :destroy
  has_many :categories, :through => :post_categories
end

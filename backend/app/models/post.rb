class Post < ApplicationRecord
  belongs_to :user, optional: true

  has_many :post_categories, dependent: :destroy
  has_many :categories, :through => :post_categories

  has_many :likes, as: :targetable

  def category_titles
    return self.categories.pluck(:title)
  end

  # def categories
  #   return self.categories.map{|cat| {label: cat.title, value: cat.id}}
  # end

  def user_name
    return self&.user&.name
  end

  def category_options
    return self.categories.map{|category| {value: category&.id, label: category&.title}}
  end
end

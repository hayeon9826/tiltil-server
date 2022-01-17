module Types
  class CategoryType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :body, String, null: true
    field :position, Integer, null: true
  end
end

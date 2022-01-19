module Types
  class PostType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :content, String, null: true
    field :user_id, ID, null: true
    field :category_ids, [Integer], null: true
    field :category_titles, [String], null: true
  end
end

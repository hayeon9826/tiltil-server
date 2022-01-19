module Types
  class PostType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :content, String, null: true
    # field :user_id, ID, null: false
    # field :category_ids, [Integer], null: true
  end
end

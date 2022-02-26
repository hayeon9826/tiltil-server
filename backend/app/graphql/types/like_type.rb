module Types
  class LikeType < Types::BaseObject
    field :id, ID, null: false
    field :targetable_type, String, null: false
    field :targetable_id, Integer, null: true
    field :user_id, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

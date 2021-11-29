module Types
  class QueryType < Types::BaseObject
    # # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    # include GraphQL::Types::Relay::HasNodeField
    # include GraphQL::Types::Relay::HasNodesField

    # # Add root-level fields here.
    # # They will be entry points for queries on your schema.

    # # TODO: remove me
    # field :test_field, String, null: false,
    #   description: "An example field added by the generator"
    # def test_field
    #   "Hello World!"
    # end
    field :all_posts, [PostType], null: false
    def all_posts
      Post.all
    end

    field :users, [UserType, null: true], null: false do
      argument :id, Integer, required: false
    end

    def users(**args)
      args[:id]
      if args[:id]
        User.where(id: args[:id])
      else
        User.all
      end
    end
  end
end

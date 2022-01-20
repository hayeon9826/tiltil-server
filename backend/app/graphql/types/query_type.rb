module Types
  class QueryType < Types::BaseObject

    field :posts, [PostType], null: false
    field :categories, [CategoryType], null: false

    def posts
      Post.all.order(created_at: :desc)
    end

    def categories
      Category.all
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

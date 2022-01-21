module Types
  class QueryType < Types::BaseObject

    field :posts, [PostType], null: false do
      argument :random, Boolean, required: false
      argument :id, Integer, required: false
    end
    field :categories, [CategoryType], null: false

    def posts(**args)
      if args[:id]
        Post.where(id: args[:id])
      elsif args[:random]
        Post.all.sample(10)
      else
        Post.all.order(created_at: :desc)
      end
    end

    def categories
      Category.all
    end

    field :users, [UserType, null: true], null: false do
      argument :id, Integer, required: false
    end

    def users(**args)
      if args[:id]
        User.where(id: args[:id])
      else
        User.all
      end
    end
  end
end

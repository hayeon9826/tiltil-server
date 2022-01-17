module Mutations
  class CreatePost < BaseMutation

    null true
    
    
    argument :title, String, required: true
    argument :content, String, required: true
    argument :category, [Integer], required: true

    # return type from the mutation
    field :message, String, null: true
    field :error, String, null: true

    def resolve(**attributes)
      if attributes && current_user
        post = Post.new(title: attributes[:title], content: attributes[:content], user_id: context[:current_user].id, category_ids: attributes[:category])
        if post.save
          { message: "게시글을 생성했습니다." }
        else
          { error: "문제가 생겼습니다. 다시 시도해주세요." }
        end
      else
        { error: "문제가 생겼습니다. 다시 시도해주세요." }
      end
    end
  end
end
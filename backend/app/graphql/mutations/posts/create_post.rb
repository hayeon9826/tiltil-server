module Mutations
  module Posts
    class CreatePost < BaseMutation
      null true
      
      argument :title, String, required: true
      argument :content, String, required: true
      argument :category, [Integer], required: true

      # return type from the mutation
      field :message, String, null: true
      field :error, String, null: true

      def resolve(**attributes)
        if attributes 
          if context[:current_user].present?
            post = Post.create(title: attributes[:title], content: attributes[:content], user_id: context[:current_user].id, category_ids: attributes[:category])
            if post
              { message: "게시글을 생성했습니다." }
            else
              { error: "게시글 생성 도중 문제가 생겼습니다. 다시 시도해주세요." }
            end
          else
            { error: "유저 세션이 만료되었습니다. 다시 로그인 후 시도해주세요." }
          end
        else
          { error: "생성 항목이 없습니다. 다시 시도해주세요." }
        end
      end
    end
  end
  
end
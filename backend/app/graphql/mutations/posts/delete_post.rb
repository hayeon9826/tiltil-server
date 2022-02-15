module Mutations
  module Posts
    class DeletePost < BaseMutation
      null true
      
      argument :id, Integer, required: true

      # return type from the mutation
      field :message, String, null: true
      field :error, String, null: true

      def resolve(**attributes)
        if attributes 
          if context[:current_user].present?
            post = Post.find_by_id(attributes[:id])
            
            if post.destroy
              { message: "게시글을 삭제했습니다." }
            else
              { error: "게시글 삭제 도중 문제가 생겼습니다. 다시 시도해주세요." }
            end
          else
            { error: "유저 세션이 만료되었습니다. 다시 로그인 후 시도해주세요." }
          end
        else
          { error: "삭제할 항목이 없습니다. 다시 시도해주세요." }
        end
      end
    end
  end
  
end
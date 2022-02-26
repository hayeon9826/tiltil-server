module Mutations
  module Likes
    class DeleteLike < BaseMutation
      null true
      
      argument :targetable_id, Integer, required: true
      argument :targetable_type, String, required: true

      # return type from the mutation
      field :success, String, null: true
      field :error, String, null: true

      def resolve(**attributes)
        if attributes 
          if attributes[:targetable_type].present? && attributes[:targetable_id].present?
            like = Like.find_by(targetable_id: attributes[:targetable_id], targetable_type: attributes[:targetable_type], user_id: context[:current_user].id)
            if like.destroy
              { success: "좋아요를 취소했습니다." }
            else
              { error: "문제가 생겼습니다. 다시 시도해주세요." }
            end
          else
            { error: "다시 시도해주세요." }
          end
        else
          { error: "다시 시도해주세요." }
        end
      end
    end
  end
  
end
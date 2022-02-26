module Mutations
  module Likes
    class CreateLike < BaseMutation
      null true
      
      argument :targetable_id, Integer, required: true
      argument :targetable_type, String, required: true

      # return type from the mutation
      field :success, String, null: true
      field :error, String, null: true
      field :like, Types::LikeType, null: true

      

      def resolve(**attributes)
        if attributes 
          if attributes[:targetable_type].present? && attributes[:targetable_id].present?
            like = Like.create(targetable_id: attributes[:targetable_id], targetable_type: attributes[:targetable_type], user_id: context[:current_user].id)
            if like
              { success: "좋아요를 생성했습니다.", like: {targetable_id: like.targetable_id, targetable_type: like.targetable_type, user_id: like.user_id, id: like.id} }
            else
              { error: "좋아요 생성 도중 문제가 생겼습니다. 다시 시도해주세요." }
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
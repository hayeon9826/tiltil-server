module Mutations
  module Users
    class UpdateUser < BaseMutation
      null true

      argument :email, String, required: true
      argument :name, String, required: true

      # return type from the mutation
      field :errors, String, null: true
      field :refresh, String, null: true
      field :token, String, null: true
      field :csrf, String, null: true

      def resolve(**attributes)
        if attributes
          user = User.find_for_database_authentication(email: attributes[:email])
          return  { errors: "사용자가 존재하지 않습니다. 다시 시도해주세요." } unless user.present?

          if user.update(name: attributes[:name])
            payload = { user_id: user.id, email: user.email, created_at: user.created_at, name: user.name }
            session =  JWTSessions::Session.new(payload: payload, refresh_by_access_allowed: true, access_exp: 1.hour.from_now.to_i, refresh_exp: 2.weeks.from_now.to_i)
            tokens = session.login
            { token: tokens[:access], csrf: tokens[:csrf], errors: "유저 정보가 수정되었습니다.", refresh: tokens[:refresh] }
          else
            { errors: "수정중 에러가 발생했습니다. 다시 시도해주세요." }
          end
        else
          { errors: "모든 필드를 입력해주세요." }
        end
      end
    end
  end
  
end
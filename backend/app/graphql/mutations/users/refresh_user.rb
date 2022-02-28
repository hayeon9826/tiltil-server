module Mutations
  module Users
    class RefreshUser < BaseMutation
      null true
      
      # return type from the mutation
      field :token, String, null: true
      field :csrf, String, null: true
      field :errors, String, null: true
      field :refresh, String, null: false

      def resolve(**attributes)
        if attributes

          user = User.find_by_id(context[:auth_refresh]["user_id"]) if context[:auth_refresh].present?
          return unless user
          
          if user&.present?
            payload = { user_id: user.id, email: user.email, created_at: user.created_at, name: user.name, access_exp: 1.hour.from_now.to_i, refresh_exp: 2.weeks.from_now.to_i }
            refresh_payload = { user_id: user.id }
            session =  JWTSessions::Session.new(payload: payload, refresh_payload: refresh_payload)
            tokens = session.login

            { token: tokens[:access], csrf: tokens[:csrf], refresh: tokens[:refresh], errors: "성공적으로 로그인 되었습니다." }
          else
            { errors: "사용자가 존재하지 않습니다." }
          end
        else
          { errors: "모든 필드를 입력해주세요." }
        end
      end
    end
  end
end
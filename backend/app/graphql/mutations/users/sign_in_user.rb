module Mutations
  module Users
    class SignInUser < BaseMutation
      null true
      
      argument :email, String, required: true
      argument :password, String, required: true

      # return type from the mutation
      field :token, String, null: true
      field :csrf, String, null: true
      field :errors, String, null: true

      def resolve(**attributes)
        if attributes
          user = User.find_for_database_authentication(email: attributes[:email])
          return unless user

          if user&.valid_password?(attributes[:password])
            payload = { user_id: user.id, email: user.email, created_at: user.created_at, name: user.name }
            session =  JWTSessions::Session.new(payload: payload, refresh_by_access_allowed: true)
            tokens = session.login

            { token: tokens[:access], csrf: tokens[:csrf], errors: "성공적으로 로그인 되었습니다." }
          else
            { errors: "비밀번호 오류입니다." }
          end
        else
          { errors: "모든 필드를 입력해주세요." }
        end
      end
    end
  end
end
module Mutations
  class SignUpUser < BaseMutation

    null true
    
    
    argument :email, String, required: true
    argument :password, String, required: true
    argument :passwordConfirmation, String, required: true

    # return type from the mutation
    field :token, String, null: true
    field :csrf, String, null: true
    field :errors, String, null: true

    def resolve(**attributes)
      if attributes
        user = User.find_for_database_authentication(email: attributes[:email])
        return  { errors: "이메일이 존재합니다. 다를 이메일을 사용해주세요." } if user.present?

        user = User.new(email: attributes[:email], password: attributes[:password], password_confirmation: attributes[:passwordConfirmation])

        if user.save
          payload = { user_id: user.id, email: user.email, name: user.name, refresh_by_access_allowed: true }
          session =  JWTSessions::Session.new(payload: payload)
          tokens = session.login

          { token: tokens[:access], csrf: tokens[:csrf], errors: "성공적으로 가입이 되었습니다." }
        else
          { errors: "비밀번호를 다시 확인해주세요." }
        end
      else
        { errors: "모든 필드를 입력해주세요." }
      end
    end
  end
end
module Mutations
  class SignInUser < BaseMutation

    null true
    
    argument :email, String, required: true
    argument :password, String, required: true

    # return type from the mutation
    field :token, String, null: true
    field :csrf, String, null: true
    field :errors, String, null: true

    def resolve(**attributes)
      puts(attributes)
      if attributes
        user = User.find_for_database_authentication(email: attributes[:email])
        return unless user

        if user&.valid_password?(attributes[:password])
          payload = { user_id: user.id, email: user.email }
          session =  JWTSessions::Session.new(payload: payload)
          tokens = session.login

          { token: tokens[:access], csrf: tokens[:csrf], errors: "Successfully signed in!" }
        else
          { errors: "password error" }
        end
      else
        { errors: "no attributes error" }
      end
    end
  end
end
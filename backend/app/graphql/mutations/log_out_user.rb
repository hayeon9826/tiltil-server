module Mutations
  class LogOutUser < BaseMutation

    null true

    argument :email, String, required: true

    field :token, String, null: true
    field :csrf, String, null: true
    field :errors, String, null: true 

    
    def resolve(**attributes)
      if attributes
        user = User.find_for_database_authentication(email: attributes[:email])
        return  { errors: "사용자 오류입니다. 잠시후 이용해주세요" } unless user.present?
        
        JWTSessions::Session.flush_all

        { token: nil, csrf: nil, errors: "잠시 후 로그아웃 됩니다." }
      else
        {errors: "사용자 오류입니다. 잠시후 이용해주세요"}
      end
    end
  end
end
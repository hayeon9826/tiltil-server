class JsonWebToken
  SECRET_KEY = Rails.application.credentials.secret_key_base


  def self.decode(token)
    return HashWithIndifferentAccess.new(JWT.decode(token, SECRET_KEY)[0])
  rescue
    nil
  end
end
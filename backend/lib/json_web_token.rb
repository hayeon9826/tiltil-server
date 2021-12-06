class JsonWebToken
  SECRET_KEY = Rails.application.credentials.secret_key_base

  def self.encode(payload)
    payload[:exp] = 15.minutes.from_now.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    decode = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decode
  end
end
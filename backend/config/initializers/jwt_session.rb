JWTSessions.access_exp_time = 3600 # 2 hour in seconds
JWTSessions.refresh_exp_time = 604800 # 1 week in seconds
JWTSessions.token_store = :redis, {
  redis_host: Rails.env.production? ? Rails.application.credentials.dig(:REDIS_URL) : "127.0.0.1",
  redis_port: Rails.env.production? ?  Rails.application.credentials.dig(:REDIS_PORT) : "6379",
  redis_db_name: "0",
  token_prefix: "jwt_#{Rails.application.class.module_parent_name.underscore}"
}
JWTSessions.algorithm = "HS256"
JWTSessions.encryption_key = Rails.application.credentials.secret_key_base
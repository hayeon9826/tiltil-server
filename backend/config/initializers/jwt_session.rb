JWTSessions.access_exp_time = 7200 # 2 hour in seconds
JWTSessions.refresh_exp_time = 604_800 # 1 week in seconds
JWTSessions.token_store = :redis, {
  redis_host: "127.0.0.1",
  redis_port: "6379",
  redis_db_name: "0",
  token_prefix: "jwt_#{Rails.application.class.module_parent_name.underscore}"
}
JWTSessions.algorithm = "HS256"
JWTSessions.encryption_key = Rails.application.credentials.secret_key_base
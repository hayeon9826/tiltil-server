class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password, :password_confirmation])
  end



  def token_authentication
    http_request = request.headers["Authorization"]
    auth_token = http_request.to_s.split(" ").last
    decode_token = JsonWebToken.decode(auth_token)
    @user = User.find(decode_token["user_id"])

    rescue JWT::ExpiredSignature => e 
      render json: { errors: e }, status: :unauthorized
  end
end

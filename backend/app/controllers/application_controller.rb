class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  attr_reader :current_user

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password, :password_confirmation])
  end
  
  private

end

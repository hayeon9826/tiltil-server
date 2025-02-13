class ApplicationController < ActionController::API
  include JWTSessions::RailsAuthorization
  rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized
  

  attr_reader :current_user

  protected
  
  private

  def not_authorized
    render json: { error: "Not authorized" }, status: :unauthorized
  end

end

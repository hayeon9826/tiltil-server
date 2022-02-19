class GraphqlController < ApplicationController
   include JWTSessions::RailsAuthorization
   rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized
  # before_action :jwt_authenticate_request!
  # before_action :token_authentication
  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  # protect_from_forgery with: :null_session

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      current_user: current_user
    }
    result = BackendSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end

  private

  def current_user
    begin
      authorize_access_request!
      current_user ||= User.find(auth_token["user_id"])
    rescue StandardError => e
      current_user = nil
    end
  end
    
    ## 헤더에 있는 정보 중, Authorization 내용(토큰) 추출
    def http_token
      http_token ||= if request.headers['Authorization'].present?
        request.headers['Authorization'].split(' ').last
      end
    end

    ## 토큰 해석 : 토큰 해석은 lib/json_web_token.rb 내의 decode 메소드에서 진행됩니다.
    def auth_token
      auth_token ||= JsonWebToken.decode(http_token)
    end


  # Handle variables in form data, JSON body, or a blank value
  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: 500
  end

  def not_authorized
    render json: { error: "Not authorized" }, status: :unauthorized
  end

end

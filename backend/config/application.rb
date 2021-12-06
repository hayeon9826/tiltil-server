require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    I18n.config.available_locales = :ko
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    config.i18n.default_locale = :ko
    config.time_zone = "Seoul"
    config.encoding = "utf-8"
    config.api_only = true

    config.to_prepare do
      DeviseController.respond_to :html, :json
    end   

    config.middleware.use ActionDispatch::Flash
    config.middleware.use Rack::MethodOverride
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
    config.autoload_paths << "#{config.root}/app/serializers/concerns"
  end
end

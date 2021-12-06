Rails.application.routes.draw do
  #devise
  devise_for :users, :controllers => { registrations: 'users/registrations' }

  # graphql
  post "/graphql", to: "graphql#execute"
  # get '/graphiql', to: 'graphiql#index' if Rails.env.development?
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "graphql#execute"
  end


  # api routes
  namespace :api do
    namespace :v1 do
      get '/items', to: 'items#index'
    end
  end
end

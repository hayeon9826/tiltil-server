Rails.application.routes.draw do
  namespace :admin do
      resources :categories 
      resources :post_categories
      resources :likes
      resources :notifications
      resources :posts
      resources :users

      root to: "categories#index"
    end
  # graphql
  post "/graphql", to: "graphql#execute"
  # get '/graphiql', to: 'graphiql#index' if Rails.env.development?
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "graphql#execute"
  end


  # api routes
  # namespace :api do
  #   namespace :v1 do
  #     get '/items', to: 'items#index'
  #   end
  # end
end

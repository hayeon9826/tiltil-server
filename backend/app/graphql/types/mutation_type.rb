module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::Users::CreateUser
    field :sign_in_user, mutation: Mutations::Users::SignInUser
    field :sign_up_user, mutation: Mutations::Users::SignUpUser
    field :log_out_user, mutation: Mutations::Users::LogOutUser
    field :update_user, mutation: Mutations::Users::UpdateUser
    field :create_post, mutation: Mutations::Posts::CreatePost
    field :update_post, mutation: Mutations::Posts::UpdatePost
  end
end

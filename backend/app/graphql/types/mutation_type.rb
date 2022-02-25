module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::Users::CreateUser
    field :sign_in_user, mutation: Mutations::Users::SignInUser
    field :sign_up_user, mutation: Mutations::Users::SignUpUser
    field :refresh_user, mutation: Mutations::Users::RefreshUser
    field :log_out_user, mutation: Mutations::Users::LogOutUser
    field :update_user, mutation: Mutations::Users::UpdateUser
    field :create_post, mutation: Mutations::Posts::CreatePost
    field :delete_post, mutation: Mutations::Posts::DeletePost
    field :update_post, mutation: Mutations::Posts::UpdatePost
    field :create_like, mutation: Mutations::Likes::CreateLike
    field :delete_like, mutation: Mutations::Likes::DeleteLike
  end
end

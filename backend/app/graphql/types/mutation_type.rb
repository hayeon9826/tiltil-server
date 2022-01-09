module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::CreateUser
    field :sign_in_user, mutation: Mutations::SignInUser
    field :sign_up_user, mutation: Mutations::SignUpUser
    field :log_out_user, mutation: Mutations::LogOutUser
    field :update_user, mutation: Mutations::UpdateUser
    # field :create_link, mutation: Mutations::CreateLink

  end
end

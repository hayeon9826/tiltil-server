// user model queries

export const getUsersQuery = (random?: boolean | null) => `query {
  users(random: ${random}){
    id
    email
    name
  }
}`;

export const getUserQuery = (id: number) => `query {
  users(id: ${id}){
    id
    email
  }
}`;

export const SignInUserQuery = (email: string, password: string) => `mutation {
  signInUser(email: "${email}", password: "${password}") {
    refresh
    token
    csrf
    errors
  }
}`;

export const SignUpUserQuery = (
  email: string,
  password: string,
  password_confirmation: string
) => `mutation {
  signUpUser(email: "${email}", password: "${password}", passwordConfirmation: "${password_confirmation}") {
    refresh
    token
    csrf
    errors
  }
}`;

export const UpdateUserQuery = (email: string, name: string) => `mutation {
  updateUser(email: "${email}", name: "${name}") {
    refresh
    token
    csrf
    errors
  }
}`;

export const LogOutUserQuery = (email: string) => `mutation {
  logOutUser(email: "${email}") {
    token
    csrf
    errors
  }
}`;

// query로 바꾸기
export const refreshUserQuery = () => `mutation {
  refreshUser{
    refresh
    token
    csrf
    errors
  }
}`;

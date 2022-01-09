// user model queries

export const getUsersQuery = `query {
  users{
    id
    email
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

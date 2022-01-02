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
  signInUser(email: "${email}", password:  "${password}") {
    token
    csrf
    errors
  }
}`;

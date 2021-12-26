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

export const loginUserQuery = (email: string, password: string) => `mutation {
  users(email: ${email}, password: ${password}) {
    id
    token
    email
  }
}
`;

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

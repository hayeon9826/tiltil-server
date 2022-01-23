export const getCategoriesQuery = `query {
  categories{
    id
    title
  }
}`;

export const getPostsQuery = (
  random?: boolean | null,
  categoryId?: any | null
) => `query {
  posts(random: ${random}, categoryId: ${categoryId}){
    id
    title
    content
    userId
    categoryIds
    categoryTitles
    userName
    createdAt
  }
}`;

export const getUserPostsQuery = (id: string) => `query{
  posts(userId: ${id}){
    id
    title
    content
    categoryTitles
    userName
    createdAt
  }
}`;

export const getPostQuery = (id: any) => `query {
  posts(id: ${id}){
    id
    title
    content
    categoryTitles
    userName
    createdAt
  }
}`;

export const CreatePostQuery = (
  title: string,
  content: string,
  category: number[]
) => `mutation {
  createPost(title: "${title}", content: "${content}", category: [${category}]) {
    message
  }
}`;

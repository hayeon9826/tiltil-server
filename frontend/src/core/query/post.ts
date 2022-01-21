export const getCategoriesQuery = `query {
  categories{
    id
    title
  }
}`;

export const getPostsQuery = (random?: boolean) => `query {
  posts(random: ${random}){
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

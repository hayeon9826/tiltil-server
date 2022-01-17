export const getCategoriesQuery = `query {
  categories{
    id
    title
    body
    position
  }
}`;

export const CreatePostQuery = (
  title: string,
  content: string,
  category: number[]
) => `mutation {
  createPost(title: "${title}", content: "${content}", category: ${category}) {
    message
  }
}`;

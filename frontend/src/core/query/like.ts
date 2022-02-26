export const CreateLikeQuery = (
  targetId: number,
  targetType: string
) => `mutation {
  createLike(targetableId: ${targetId}, targetableType: "${targetType}") {
    error
    success
    like
  }
}`;

export const DeleteLikeQuery = (
  targetId: number,
  targetType: string
) => `mutation {
  deleteLike(targetableId: ${targetId}, targetableType: "${targetType}") {
    error
    success
    like
  }
}`;

export const getLikesQuery = () => `query {
  likes(){
    id 
    targetableId
    targetableType
    userId
  }
}`;

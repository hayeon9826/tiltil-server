export const CreateLikeQuery = (
  targetId: string,
  targetType: string
) => `mutation {
  createLike(targetableId: ${targetId}, targetableType: ${targetType}) {
    error
    success
  }
}`;

export const DeleteLikeQuery = (
  targetId: string,
  targetType: string
) => `mutation {
  deleteLike(targetableId: ${targetId}, targetableType: ${targetType}) {
    error
    success
  }
}`;

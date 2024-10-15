export const commentResponseDto = (comment) => {
    return {
      id: comment._id,
      nickname: comment.nickname,
      content: comment.content,
      createdAt: comment.createdAt,
    };
  };
  
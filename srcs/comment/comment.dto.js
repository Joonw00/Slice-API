export const commentResponseDto = (comment) => {
    return {
      id: comment._id,
      nickname: comment.nickname,
      content: comment.content,
      createdAt: comment.createdAt,
    };
};


export const commentListResponseDto = (commentList) => {
  return {
    currentPage: commentList.currentPage,
    totalPages: commentList.totalPages,
    totalItemCount: commentList.totalItemCount,
    data: commentList.data.map(comment => ({
      id: comment._id,
      nickname: comment.nickname,
      content: comment.content,
      createdAt: comment.createdAt,
    })),
  };
};
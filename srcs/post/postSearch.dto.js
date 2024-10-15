export const postListResponseDto = (postList) => {
    return {
      currentPage: postList.currentPage,
      totalPages: postList.totalPages,
      totalItemCount: postList.totalItemCount,
      data: postList.data.map(post => ({
        id: post._id,
        nickname: post.nickname,
        title: post.title,
        tags: post.tags,
        location: post.location,
        moment: post.moment,
        commentCount: post.commentCount,
        createdAt: post.createdAt,
      })),
    };
};
export const postDetailResponseDto = (post) => {
    return {
      id: post._id,
      groupId: post.groupId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      tags: post.tags,
      location: post.location,
      moment: post.moment,
      commentCount: post.commentCount,
      createdAt: post.createdAt,
    };
};  
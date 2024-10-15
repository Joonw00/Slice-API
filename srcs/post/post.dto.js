export const postResponseDto = (post) => {
    return {
      id: post._id,
      groupId: post.groupId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      tags: post.tags,
      location: post.location,
      commentCount: post.commentCount || 0,
      moment: post.moment,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };
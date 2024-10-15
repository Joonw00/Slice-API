export const createPostResponseDto = (post) => {
    return {
      id: post._id,
      groupId: post.groupId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      tags: post.tags,
      location: post.location,
      moment: post.moment,
      createdAt: post.createdAt,
    };
  };
import Post from './post.model.js';

export const getPostList = async ({ groupId, page, pageSize, sortBy, keyword }) => {
  const posts = await Post.getPostsWithFilters({
    groupId,
    page,
    pageSize,
    sortBy,
    keyword,
  });

  const totalItemCount = await Post.getTotalPostCount(groupId, keyword);
  const totalPages = Math.ceil(totalItemCount / pageSize);

  return {
    currentPage: page,
    totalPages,
    totalItemCount,
    data: posts,
  };
};


export const getPostDetail = async (postId) => {
    const post = await Post.getPostById(postId);
    if (!post) {
      throw new Error('NOT_FOUND');
    }
  
    return post;
};
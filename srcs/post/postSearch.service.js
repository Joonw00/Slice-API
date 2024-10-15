import Post from './post.model.js';
import { countCommentsByPostId } from '../comment/comment.service.js'; 

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

  for (const post of posts) {
    post.commentCount = await countCommentsByPostId(post._id);
  }

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
    post.commentCount = await countCommentsByPostId(postId);

    return post;
};



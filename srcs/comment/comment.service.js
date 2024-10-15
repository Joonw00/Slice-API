import Comment from './comment.model.js';
import bcrypt from 'bcryptjs';

const verifyCommentPassword = async (commentId, password) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('NOT_FOUND');
  }
  const isMatch = await bcrypt.compare(password, comment.password);
  if (!isMatch) {
    throw new Error('FORBIDDEN');
  }

  return comment;
};

export const addComment = async (postId, commentData) => {
  const { nickname, content, password } = commentData;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newComment = await Comment.createComment({
    postId,
    nickname,
    content,
    password: hashedPassword,
  });

  return newComment;
};

export const deleteComment = async (commentId, password) => {
  await verifyCommentPassword(commentId, password);
  await Comment.deleteComment(commentId);

  return { message: '댓글 삭제 성공' };
};


export const getCommentList = async ({ postId, page, pageSize }) => {
  const comments = await Comment.getCommentsWithPaging({ postId, page, pageSize });
  const totalItemCount = await Comment.getTotalCommentCount(postId);
  const totalPages = Math.ceil(totalItemCount / pageSize);

  return {
    currentPage: page,
    totalPages,
    totalItemCount,
    data: comments,
  };
};


export const countCommentsByPostId = async (postId) => {
  return Comment.countDocuments({ postId });
};
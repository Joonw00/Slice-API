import Post from './post.model.js';
import { countCommentsByPostId } from '../comment/comment.service.js';
import { verifyGroupPassword } from '../group/group.service.js'; 
import bcrypt from 'bcryptjs';

const verifyPostPassword = async (postId, postPassword) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('NOT_FOUND');
  }

  const isMatch = await bcrypt.compare(postPassword, post.postPassword);
  if (!isMatch) {
    throw new Error('FORBIDDEN');
  }

  return post;
};

export const createPost = async (groupId, postData) => {
  const { nickname, title, content, postPassword, groupPassword, tags, location, moment } = postData;

  await verifyGroupPassword(groupId, groupPassword);
  const hashedPostPassword = await bcrypt.hash(postPassword, 10);

  const newPost = await Post.createPost({
    groupId,
    nickname,
    title,
    content,
    postPassword: hashedPostPassword,
    tags,
    location,
    moment,
  });

  return newPost;
};

export const updatePost = async (postId, updateData) => {
  const { postPassword, nickname, title, content, tags, location, moment } = updateData;

  await verifyPostPassword(postId, postPassword);

  const updatedPost = await Post.updatePost(postId, {
    nickname,
    title,
    content,
    tags,
    location,
    moment,
  });
  const commentCount = await countCommentsByPostId(postId);
  return {
    ...updatedPost.toObject(), 
    commentCount,  
  };};


export const deletePost = async (postId, postPassword) => {
  await verifyPostPassword(postId, postPassword);

  await Post.deletePost(postId);

  return { message: '게시글 삭제 성공' };
};



export const countPostsByGroupId = async (groupId) => {
  return Post.countPostsByGroupId(groupId);
};
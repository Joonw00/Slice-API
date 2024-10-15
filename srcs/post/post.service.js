import Post from './post.model.js';
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

// 게시글 생성 서비스 함수
export const createPost = async (groupId, postData) => {
  const { nickname, title, content, postPassword, groupPassword, tags, location, moment } = postData;

  // 그룹 비밀번호 검증 (group 서비스에서 가져온 함수 사용)
  await verifyGroupPassword(groupId, groupPassword);

  // 게시글 비밀번호 해시화
  const hashedPostPassword = await bcrypt.hash(postPassword, 10);

  // 게시글 데이터 생성
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

  return updatedPost;
};


export const deletePost = async (postId, postPassword) => {
  await verifyPostPassword(postId, postPassword);

  await Post.deletePost(postId);

  return { message: '게시글 삭제 성공' };
};



export const countPostsByGroupId = async (groupId) => {
  return Post.countPostsByGroupId(groupId);
};
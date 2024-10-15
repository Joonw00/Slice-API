import Post from './post.model.js';
import { verifyGroupAndPassword } from '../group/group.service.js';  // group 서비스에서 가져오기
import bcrypt from 'bcryptjs';

// 게시글 생성 서비스 함수
export const createPost = async (groupId, postData) => {
  const { nickname, title, content, postPassword, groupPassword, tags, location, moment } = postData;

  // 그룹 비밀번호 검증 (group 서비스에서 가져온 함수 사용)
  await verifyGroupAndPassword(groupId, groupPassword);

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

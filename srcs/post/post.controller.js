import { createPost, updatePost, deletePost  } from './post.service.js';
import { createPostResponseDto } from './post.dto.js';

// 게시글 생성 컨트롤러
export const createPostController = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const postData = req.body;
    const newPost = await createPost(groupId, postData);
    const response = createPostResponseDto(newPost);

    res.status(200).json(response); 
  } catch (error) {
    next(error);
  }
};

export const updatePostController = async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const updateData = req.body;
  
      // 서비스 호출
      const updatedPost = await updatePost(postId, updateData);
  
      // DTO로 응답 변환
      const response = createPostResponseDto(updatedPost);
  
      res.status(200).json(response);  // 200 OK
    } catch (error) {
      next(error);  // 에러를 미들웨어로 전달
    }
};


export const deletePostController = async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const { postPassword } = req.body;
  
      // 서비스 호출
      const response = await deletePost(postId, postPassword);
  
      res.status(200).json(response);  // 200 OK
    } catch (error) {
      next(error);  // 에러를 미들웨어로 전달
    }
  };
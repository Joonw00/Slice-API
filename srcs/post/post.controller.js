import { createPost } from './post.service.js';
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

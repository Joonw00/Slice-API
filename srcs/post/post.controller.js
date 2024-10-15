import { createPost, updatePost, deletePost  } from './post.service.js';
import { postResponseDto } from './post.dto.js';

export const createPostController = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const postData = req.body;
    const newPost = await createPost(groupId, postData);
    const response = postResponseDto(newPost);

    res.status(200).json(response); 
  } catch (error) {
    next(error);
  }
};

export const updatePostController = async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const updateData = req.body;
      const updatedPost = await updatePost(postId, updateData);
  
      const response = postResponseDto(updatedPost);
  
      res.status(200).json(response);
    } catch (error) {
      next(error); 
    }
};


export const deletePostController = async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const { postPassword } = req.body;
  
      const response = await deletePost(postId, postPassword);
  
      res.status(200).json(response); 
    } catch (error) {
      next(error); 
    }
  };
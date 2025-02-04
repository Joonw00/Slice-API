import { addComment, deleteComment, getCommentList  } from './comment.service.js';
import { commentResponseDto, commentListResponseDto  } from './comment.dto.js';

export const addCommentController = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const commentData = req.body;

    const newComment = await addComment(postId, commentData);
    const response = commentResponseDto(newComment);

    res.status(200).json(response); 
  } catch (error) {
    next(error); 
  }
};

export const deleteCommentController = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const { password } = req.body;

    const response = await deleteComment(commentId, password);
    res.status(200).json(response); 
  } catch (error) {
    next(error);  
  }
};


export const getCommentListController = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const { page = 1, pageSize = 10 } = req.query;

    const commentList = await getCommentList({
      postId,
      page: Number(page),
      pageSize: Number(pageSize),
    });

    const response = commentListResponseDto(commentList);

    res.status(200).json(response);  
  } catch (error) {
    next(error);  
  }
};
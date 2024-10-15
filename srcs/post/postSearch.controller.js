import { getPostList, getPostDetail  } from './postSearch.service.js';
import { postListResponseDto, postDetailResponseDto  } from './postSearch.dto.js';

export const getPostListController = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const { page = 1, pageSize = 10, sortBy = 'latest', keyword = '' } = req.query;

    const postList = await getPostList({
      groupId,
      page: Number(page),
      pageSize: Number(pageSize),
      sortBy,
      keyword,
    });

    const response = postListResponseDto(postList);

    res.status(200).json(response); 
  } catch (error) {
    next(error); 
  }
};


export const getPostDetailController = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await getPostDetail(postId);
    const response = postDetailResponseDto(post);

    res.status(200).json(response); 
  } catch (error) {
    next(error); 
  }
};
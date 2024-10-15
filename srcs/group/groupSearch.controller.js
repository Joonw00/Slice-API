import { getGroupList, getGroupDetail } from './groupSearch.service.js';
import { groupListResponseDto, groupDetailResponseDto } from './groupSearch.dto.js';

export const getGroupListController = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10, sortBy = 'latest', keyword = '' } = req.query;

    const groupList = await getGroupList({
      page: Number(page),
      pageSize: Number(pageSize),
      sortBy,
      keyword,
    });

    const response = groupListResponseDto(groupList);

    res.status(200).json(response);  
  } catch (error) {
    next(error);  
  }
};


export const getGroupDetailController = async (req, res, next) => {
    try {
      const groupId = req.params.groupId;
  
      const group = await getGroupDetail(groupId);
      const response = groupDetailResponseDto(group);
  
      res.status(200).json(response); 
    } catch (error) {
        next(error);  
    }
};
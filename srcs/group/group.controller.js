import { createGroup, updateGroup, deleteGroup  } from './group.service.js';
import { createGroupResponseDto } from './group.dto.js';

// 그룹 생성 컨트롤러
export const createGroupController = async (req, res, next) => {
  try {
    const newGroup = await createGroup(req.body);
    const response = createGroupResponseDto(newGroup);
    res.status(201).json(response);  // 201 Created
  } catch (error) {
    next(error); 
  }
};

// 그룹 수정 컨트롤러
export const updateGroupController = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const updatedGroup = await updateGroup(groupId, req.body);
    const response = createGroupResponseDto(updatedGroup);
    res.status(201).json(response); 
  } catch (error) {
    next(error);  
  }
};
export const deleteGroupController = async (req, res, next) => {
    try {
      const groupId = req.params.groupId;
      const { password } = req.body;
  
      const response = await deleteGroup(groupId, password);
      res.status(200).json(response);  
    } catch (error) {
      next(error);
    }
  };
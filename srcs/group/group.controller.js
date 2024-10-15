import { createGroup, updateGroup, deleteGroup  } from './group.service.js';
import { groupResponseDto } from './group.dto.js';

export const createGroupController = async (req, res, next) => {
  try {
    const newGroup = await createGroup(req.body);
    const response = groupResponseDto(newGroup);
    res.status(201).json(response); 
  } catch (error) {
    next(error); 
  }
};

export const updateGroupController = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const updatedGroup = await updateGroup(groupId, req.body);
    const response = groupResponseDto(updatedGroup);
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
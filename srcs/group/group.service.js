import Group from './group.model.js';
import bcrypt from 'bcryptjs';
export const verifyGroupAndPassword = async (groupId, password) => {
    const group = await Group.findById(groupId);
    if (!group) {
      throw new Error('NOT_FOUND');
    }
  
    const isMatch = await bcrypt.compare(password, group.password);
    if (!isMatch) {
      throw new Error('FORBIDDEN');
    }
  
    return group;
  };

export const createGroup = async (groupData) => {
  const { name, password, introduction } = groupData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newGroup = await Group.createGroup({
    name,
    password: hashedPassword,
    introduction,
  });

  return newGroup;
};

export const updateGroup = async (groupId, updateData) => {
  const { password, name, introduction } = updateData;
  const group = await verifyGroupAndPassword(groupId, password);

  const updatedGroup = await Group.updateGroup(groupId, {
    name,
    introduction,
    updatedAt: Date.now(),
  });

  return updatedGroup;
};


export const deleteGroup = async (groupId, password) => {
    const group = await verifyGroupAndPassword(groupId, password);
    await Group.deleteGroup(groupId);
  
    return { message: '그룹 삭제 성공' };
  };
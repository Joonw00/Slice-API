import Group from './group.model.js';

export const getGroupList = async ({ page, pageSize, sortBy, keyword }) => {
  const groups = await Group.getGroupsWithFilters({ page, pageSize, sortBy, keyword });

  const totalItemCount = await Group.getTotalGroupCount(keyword);

  const totalPages = Math.ceil(totalItemCount / pageSize);

  return {
    currentPage: page,
    totalPages,
    totalItemCount,
    data: groups,
  };
};
export const getGroupDetail = async (groupId) => {
    const group = await Group.getGroupById(groupId);
    if (!group) {
      throw new Error('NOT_FOUND');
    }
  
    return group;
};
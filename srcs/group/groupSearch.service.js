import Group from './group.model.js';
import { countPostsByGroupId } from '../post/post.service.js';

export const getGroupList = async ({ page, pageSize, sortBy, keyword }) => {
  const groups = await Group.getGroupsWithFilters({ page, pageSize, sortBy, keyword });
  const totalItemCount = await Group.getTotalGroupCount(keyword);
  const totalPages = Math.ceil(totalItemCount / pageSize);

  for (const group of groups) {
    group.postCount = await countPostsByGroupId(group._id);
  }

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
    group.postCount = await countPostsByGroupId(groupId);

    return group;
};
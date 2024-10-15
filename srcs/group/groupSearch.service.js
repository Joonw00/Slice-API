import Group from './group.model.js';
import { countPostsByGroupId } from '../post/post.service.js';
import { sortData } from '../../utils/sort.js'; 

export const getGroupList = async ({ page, pageSize, sortBy, keyword }) => {
  const groups = await Group.getGroupsWithFilters({ page, pageSize, keyword });
  const totalItemCount = await Group.getTotalGroupCount(keyword);
  const totalPages = Math.ceil(totalItemCount / pageSize);

  for (const group of groups) {
    group.postCount = await countPostsByGroupId(group._id);
  }
  const sortedGroups = sortData(groups, sortBy);

  return {
    currentPage: page,
    totalPages,
    totalItemCount,
    data: sortedGroups,
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
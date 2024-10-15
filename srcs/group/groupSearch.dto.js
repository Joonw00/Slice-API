export const groupListResponseDto = (groupList) => {
    return {
      currentPage: groupList.currentPage,
      totalPages: groupList.totalPages,
      totalItemCount: groupList.totalItemCount,
      data: groupList.data.map(group => ({
        id: group._id,
        name: group.name,
        postCount: group.postCount,
        createdAt: group.createdAt,
        introduction: group.introduction,
      })),
    };
};


export const groupDetailResponseDto = (group) => {
    return {
      id: group._id,
      name: group.name,
      imageUrl: group.imageUrl,
      isPublic: group.isPublic,
      likeCount: group.likeCount,
      badges: group.badges,
      postCount: group.postCount,
      createdAt: group.createdAt,
      introduction: group.introduction,
    };
};
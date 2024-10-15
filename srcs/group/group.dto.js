export const groupResponseDto = (group) => {
    return {
      id: group._id,
      name: group.name,
      postCount: group.postCount || 0,
      createdAt: group.createdAt,
      introduction: group.introduction,
    };
  };
  
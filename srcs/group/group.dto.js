// 그룹 생성/수정 응답 DTO
export const createGroupResponseDto = (group) => {
    return {
      id: group._id,
      name: group.name,
      createdAt: group.createdAt,
      introduction: group.introduction,
    };
  };
  
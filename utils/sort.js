export const sortOptions = {
    latest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    mostCommented: (a, b) => b.commentCount - a.commentCount,
    mostPosted: (a, b) => b.postCount - a.postCount,
  };
  
export const sortData = (data, sortBy) => {
    return data.sort(sortOptions[sortBy] || sortOptions.latest);
};
  
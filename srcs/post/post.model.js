import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true }, 
  nickname: { type: String, required: true }, 
  title: { type: String, required: true },    
  content: { type: String, required: true }, 
  postPassword: { type: String, required: true },
  tags: { type: [String] },    
  location: { type: String },  
  moment: { type: Date },     
  createdAt: { type: Date, default: Date.now },
});

postSchema.statics.createPost = function (postData) {
  const post = new this(postData);
  return post.save();
};

postSchema.statics.updatePost = function (postId, updateData) {
  return this.findByIdAndUpdate(postId, updateData, { new: true });
};

postSchema.statics.deletePost = function (postId) {
    return this.findByIdAndDelete(postId);
};

postSchema.statics.getPostsWithFilters = function ({ groupId, page, pageSize, sortBy, keyword }) {
  const sortOptions = {
    latest: { createdAt: -1 },
    mostCommented: { commentCount: -1 },
  };

  // 검색 조건 (title에 keyword 포함 여부)
  const query = {
    groupId,
    ...(keyword ? { title: { $regex: keyword, $options: 'i' } } : {}),
  };

  // 페이징 처리
  const skip = (page - 1) * pageSize;

  // 게시글 목록을 검색어, 정렬 기준, 페이징에 맞춰 조회
  return this.find(query)
    .sort(sortOptions[sortBy] || sortOptions.latest)
    .skip(skip)
    .limit(pageSize);
};

// 총 게시글 수 조회 (검색 조건 포함)
postSchema.statics.getTotalPostCount = function (groupId, keyword) {
  const query = {
    groupId,
    ...(keyword ? { title: { $regex: keyword, $options: 'i' } } : {}),
  };

  return this.countDocuments(query);
};


postSchema.statics.getPostById = function (postId) {
  return this.findOne({ _id: postId });
};
const Post = mongoose.model('Post', postSchema);
export default Post;

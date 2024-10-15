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

postSchema.statics.getPostsWithFilters = function ({ groupId, page, pageSize, keyword }) {
  const query = {
    groupId,
    ...(keyword ? { title: { $regex: keyword, $options: 'i' } } : {}),
  };
  const skip = (page - 1) * pageSize;

  return this.find(query).skip(skip).limit(pageSize).lean();
};

postSchema.statics.getTotalPostCount = function (groupId, keyword) {
  const query = {
    groupId,
    ...(keyword ? { title: { $regex: keyword, $options: 'i' } } : {}),
  };

  return this.countDocuments(query);
};

// 게시글 상세 조회
postSchema.statics.getPostById = function (postId) {
  return this.findOne({ _id: postId }).lean();
};


postSchema.statics.countPostsByGroupId = function (groupId) {
  return this.countDocuments({ groupId });
};
const Post = mongoose.model('Post', postSchema);
export default Post;

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

// 게시글 생성 메서드
postSchema.statics.createPost = function (postData) {
  const post = new this(postData);
  return post.save();
};

const Post = mongoose.model('Post', postSchema);
export default Post;

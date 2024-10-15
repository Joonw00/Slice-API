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


const Post = mongoose.model('Post', postSchema);
export default Post;

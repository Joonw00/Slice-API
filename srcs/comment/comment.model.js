import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, 
  nickname: { type: String, required: true },  
  content: { type: String, required: true },   
  password: { type: String, required: true },  
  createdAt: { type: Date, default: Date.now }, 
});

commentSchema.statics.createComment = function (commentData) {
  const comment = new this(commentData);
  return comment.save();
};

commentSchema.statics.deleteComment = function (commentId) {
  return this.findByIdAndDelete(commentId);
};

commentSchema.statics.getCommentsWithPaging = function ({ postId, page, pageSize }) {
  const skip = (page - 1) * pageSize;

  return this.find({ postId })
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 });
};

commentSchema.statics.getTotalCommentCount = function (postId) {
  return this.countDocuments({ postId });
};

commentSchema.statics.countCommentsByPostId = function (postId) {
  return this.countDocuments({ postId });
};
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;

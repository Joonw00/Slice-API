import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, 
  nickname: { type: String, required: true },  
  content: { type: String, required: true },   
  password: { type: String, required: true },  
  createdAt: { type: Date, default: Date.now }, 
});

// 댓글 추가 메서드
commentSchema.statics.createComment = function (commentData) {
  const comment = new this(commentData);
  return comment.save();
};

// 댓글 삭제 메서드
commentSchema.statics.deleteComment = function (commentId) {
  return this.findByIdAndDelete(commentId);
};

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;

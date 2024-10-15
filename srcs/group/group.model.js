import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  introduction: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

groupSchema.statics.createGroup = function (groupData) {
  const group = new this(groupData);
  return group.save();
};

groupSchema.statics.findById = function (groupId) {
  return this.findOne({ _id: groupId });
};

groupSchema.statics.updateGroup = function (groupId, updateData) {
  return this.findByIdAndUpdate(groupId, updateData, { new: true });
};

groupSchema.statics.deleteGroup = function (groupId) {
    return this.findByIdAndDelete(groupId);
  };
const Group = mongoose.model('Group', groupSchema);
export default Group;

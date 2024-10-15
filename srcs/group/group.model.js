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


groupSchema.statics.getGroupsWithFilters = function ({ page, pageSize, sortBy, keyword }) {
  const sortOptions = {
    latest: { createdAt: -1 },
    mostPosted: { postCount: -1 },
  };

  // 검색 조건 (name 또는 introduction에 keyword 포함 여부)
  const query = keyword
    ? {
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { introduction: { $regex: keyword, $options: 'i' } },
        ],
      }
    : {};

  // 페이징 처리
  const skip = (page - 1) * pageSize;

  // 그룹 목록을 검색어, 정렬 기준, 페이징에 맞춰 조회
  return this.find(query)
    .sort(sortOptions[sortBy] || sortOptions.latest)
    .skip(skip)
    .limit(pageSize);
};

groupSchema.statics.getTotalGroupCount = function (keyword) {
  const query = keyword
    ? {
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { introduction: { $regex: keyword, $options: 'i' } },
        ],
      }
    : {};

  return this.countDocuments(query);
};

groupSchema.statics.getGroupById = function (groupId) {
  return this.findOne({ _id: groupId });
};
const Group = mongoose.model('Group', groupSchema);
export default Group;

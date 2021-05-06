import mongoose, { Schema } from 'mongoose';

let userGroupSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

const UserGroupModel = mongoose.model('user_groups', userGroupSchema);

export default UserGroupModel;
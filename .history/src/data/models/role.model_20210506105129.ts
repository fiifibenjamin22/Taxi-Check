import mongoose, { Schema } from 'mongoose';

let roleSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    user_group: { type: Schema.Types.ObjectId, ref: 'user_groups' },
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

const RoleModel = mongoose.model('user_roles', roleSchema);

export default RoleModel;
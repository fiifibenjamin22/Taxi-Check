import mongoose, { Schema } from 'mongoose';

let roleSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

const UserRolesModel = mongoose.model('user_roles', roleSchema);

export default UserRolesModel;
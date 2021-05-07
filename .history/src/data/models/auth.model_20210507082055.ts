import mongoose, { Schema } from 'mongoose';

let authSchema = new mongoose.Schema({
    username: { type: String, require: 'Username is Required' },
    password: { type: String, require: 'Password is Required' },
    confirm_password: { type: String, require: 'Password is Required' },
    requires_password_reset: Boolean,
    institution_id: String,
    user: { type: Schema.Types.ObjectId, ref: 'users', require: 'User info is required'},
    user_group: { type: Schema.Types.ObjectId, ref: 'user_groups', require: 'User group is required'},
    role: { type: Schema.Types.ObjectId, ref: 'roles', require: 'User role is required'},
    created_by: {type: Schema.Types.ObjectId, ref: 'users'},
}, { timestamps: true });

const AuthModel = mongoose.model('auth', authSchema);

export default AuthModel;
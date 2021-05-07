import mongoose, { Schema } from 'mongoose';

let userSchema = new mongoose.Schema({
    first_name: { type: String, require: 'First name is Required' },
    last_name: { type: String, require: 'Last name is Required' },
    username: { type: String, require: 'Username is Required' },
    password: { type: String, require: 'Password is Required' },
    email: String,
    user_group: { type: Schema.Types.ObjectId, ref: 'user_groups', require: 'User Group is required'},
    role: { type: Schema.Types.ObjectId, ref: 'roles', require: 'User role is required'},
    created_by: {type: Schema.Types.ObjectId, ref: 'users'},
}, { timestamps: true });

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
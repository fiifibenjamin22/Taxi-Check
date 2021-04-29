import mongoose, { Schema } from 'mongoose';

let userSchema = new mongoose.Schema({
    first_name: { type: String, require: 'First name is Required' },
    last_name: { type: String, require: 'Last name is Required' },
    username: { type: String, require: 'Username is Required' },
    password: { type: String, require: 'Password is Required' },
    email: String,
    user_group: {
        type: String,
        default: 'user',
        enum: ["administrator", "support", "security", "assembly", "user"]
    },
    role: {
        type: String,
        default: 'administrator',
        enum: ["administrator", "maintainer", "viewer", "user"]
    },
    created_by: {type: Schema.Types.ObjectId, ref: 'users'},
}, { timestamps: true });

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
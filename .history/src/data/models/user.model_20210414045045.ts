import mongoose from 'mongoose';
import { IUser } from '../../domain/interfaces/user.interface';

let userSchema = new mongoose.Schema({
    first_name: { type: String, require: 'First name is Required' },
    last_name: { type: String, require: 'Last name is Required' },
    username: { type: String, require: 'Username is Required' },
    password: { type: String, require: 'Password is Required' },
    email: String,
    user_group: {
        type: String,
        default: 'user',
        enum: ["admin", "municipal-assembly", "police", "user"]
    },
    role: {
        type: String,
        default: 'admin',
        enum: ["admin", "mediator", "commenter"]
    },
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
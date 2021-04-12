import mongoose from 'mongoose';

let userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        role: String,
    });

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    email: String,
    role: String
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
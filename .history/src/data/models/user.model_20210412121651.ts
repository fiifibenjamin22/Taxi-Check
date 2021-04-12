import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    first_name: String,
    last_name: String,
    email: String,
    role: {type: String, require: true},
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
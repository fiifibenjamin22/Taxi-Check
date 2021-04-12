import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    username: { type: String, require: 'Username is Required' },
    password: { type: String, require: 'Password is Required' },
    first_name: String,
    last_name: String,
    email: String,
    role: {
        type: String,
        default: 'municipal-assembly',
        enum: ["municipal-assembly", "municipal-assembly-admin", "police", "police-admin", "consumer", "admin"]
    },
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
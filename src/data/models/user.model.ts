import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    username: { type: String, require: 'Username is Required' },
    password: { type: String, require: 'Password is Required' },
    first_name: { type: String, require: 'First name is Required' },
    last_name: { type: String, require: 'Last name is Required' },
    email: String,
    role: {
        type: String,
        default: 'municipal-assembly',
        enum: ["municipal-assembly", "municipal-assembly-admin", "police", "police-admin", "consumer", "admin"]
    },
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
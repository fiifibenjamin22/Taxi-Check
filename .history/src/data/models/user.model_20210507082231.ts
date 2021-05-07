import mongoose, { Schema } from 'mongoose';

let userSchema = new mongoose.Schema({
    first_name: { type: String, require: 'First name is Required' },
    last_name: { type: String, require: 'Last name is Required' },
    contact: { phone: String, email: String },
    address: { ghana_post: String, physical_address: String },
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
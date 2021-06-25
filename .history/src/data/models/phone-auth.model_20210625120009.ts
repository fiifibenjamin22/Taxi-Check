import mongoose, { Schema } from 'mongoose';

let phoneAuthSchema = new mongoose.Schema({
    phone: { type: String, require: 'Phone is Required' },
    otp: { type: String },
    status: { type: String },
}, { timestamps: true });

const PhoneAuthModel = mongoose.model('phone_auth', phoneAuthSchema);

export default PhoneAuthModel;
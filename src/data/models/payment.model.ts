import mongoose, { Schema } from 'mongoose';

let paymentSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    mno: { type: String, required: true },
    amount: { type: Number, required: true },
    msisdn: { type: String, required: true },
    description: { type: String, required: true },
    reference: { type: String, required: true },
    status: { type: String, required: false },
    message: { type: String, required: false },
}, { timestamps: true });

const PaymentModel = mongoose.model('Payments', paymentSchema);
export default PaymentModel;
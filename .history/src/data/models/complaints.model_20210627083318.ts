import mongoose, { Schema } from 'mongoose';

let complaintsSchema = new mongoose.Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicles' },
    reported_by: { type: Schema.Types.ObjectId, ref: 'users' },
    assigned_to: { type: Schema.Types.ObjectId, ref: 'users' },
    reason: String,
    comments: String,
    status: String,
}, { timestamps: true });

const ComplaintsModel = mongoose.model('complaints', complaintsSchema);

export default ComplaintsModel;
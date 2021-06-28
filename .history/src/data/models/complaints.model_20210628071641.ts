import mongoose, { Schema } from 'mongoose';

let complaintsSchema = new mongoose.Schema({
    vehicle_plate: {type: String},
    reported_by: { type: Schema.Types.ObjectId, ref: 'auth' },
    assigned_to: { type: Schema.Types.ObjectId, ref: 'users' },
    reason: String,
    comments: String,
    status: String,
}, { timestamps: true });

const ComplaintsModel = mongoose.model('complaints', complaintsSchema);

export default ComplaintsModel;
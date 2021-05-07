import mongoose, { Schema } from 'mongoose';

let regionSchema = new mongoose.Schema({
    name: { type: String, require: 'Name is Required' },
    description: String,
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

const RegionModel = mongoose.model('regions', regionSchema);

export default RegionModel;
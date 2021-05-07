import mongoose, { Schema } from 'mongoose';

let assemblySchema = new mongoose.Schema({
    name: { type: String, require: 'Name is Required' },
    address: { physical_address: String, postal_address: String, ghana_post: String },
    region: { type: Schema.Types.ObjectId, ref: 'regions' },
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

const AssemblyModel = mongoose.model('assemblies', assemblySchema);

export default AssemblyModel;
import mongoose, { Schema } from 'mongoose';

let municipalAssemblySchema = new mongoose.Schema({
    name: { type: String, require: 'Name is Required' },
    address: { physical_address: String, postal_address: String, ghana_post: String },
    region: { type: Schema.Types.ObjectId, ref: 'regions' },
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

const MunicipalAssemblyModel = mongoose.model('municipal_assemblies', municipalAssemblySchema);

export default MunicipalAssemblyModel;
import mongoose, { Schema } from 'mongoose';

let municipalAssemblySchema = new mongoose.Schema({
    name: { type: String, require: 'Name is Required' },
    address: { physical_address: String, postal_address: String, ghana_post: String },
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
});

const MunicipalAssemblyModel = mongoose.model('municipal_assemblies', municipalAssemblySchema);

export default MunicipalAssemblyModel;
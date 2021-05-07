import mongoose, { Schema } from 'mongoose';

let regionSchema = new mongoose.Schema({
    name: { type: String, require: 'Name is Required' },
    description: { type: Schema.Types.ObjectId, ref: 'regions' },
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

const MunicipalAssemblyModel = mongoose.model('municipal_assemblies', regionSchema);

export default MunicipalAssemblyModel;
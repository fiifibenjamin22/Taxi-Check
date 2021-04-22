import { CRUD } from "../../domain/interfaces/crud.interface";
import { ITerminalMaster } from "../../domain/interfaces/terminal-master.interface";
import TerminalMasterModel from "../models/terminal/terminal-master.model";

class TerminalMasterService implements CRUD {

    public async list(limit?: number, page?: number): Promise<any[]> {
        return await TerminalMasterModel.find();
    }

    public async create(terminalMaster: ITerminalMaster): Promise<any> {
        return await new TerminalMasterModel(terminalMaster).save();
    }

    public async putById(id: string, terminalMaster: ITerminalMaster): Promise<any> {
        return await TerminalMasterModel.updateOne({ _id: id }, terminalMaster);
    }

    public async readById(id: string): Promise<any> {
        return await TerminalMasterModel.findById(id);
    }

    public async deleteById(id: string): Promise<any> {
        return await TerminalMasterModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, terminalMaster: ITerminalMaster): Promise<any> {

    }
}

export default new TerminalMasterService();
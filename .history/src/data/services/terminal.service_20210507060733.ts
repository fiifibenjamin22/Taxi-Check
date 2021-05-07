import { CRUD } from "../../core/helpers/crud.interface";
import { ITerminal } from "../../domain/interfaces/terminal.interface";
import TerminalModel from "../models/terminal.model";

class TerminalService implements CRUD {

    public async list(limit?: number, page?: number): Promise<any[]> {
        return await TerminalModel.find().limit(limit);
    }

    public async create(terminal: ITerminal): Promise<any> {
        return await new TerminalModel(terminal).save();
    }

    public async putById(id: string, terminal: ITerminal): Promise<any> {
        return await TerminalModel.updateOne({ _id: id }, terminal);
    }

    public async readById(id: string): Promise<any> {
        return await TerminalModel.findById(id);
    }

    public async deleteById(id: string): Promise<any> {
        return await TerminalModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, terminal: ITerminal): Promise<any> {

    }
}

export default new TerminalService();
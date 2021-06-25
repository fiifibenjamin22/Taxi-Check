import UserModel from "../models/user.model";
import { ICredentials } from "../../domain/interfaces/credentials.interface";
import { IUser } from "../../domain/interfaces/user.interface";
import { CRUD } from "../../domain/interfaces/common/crud.interface";
import { IAuth } from "../../domain/interfaces/auth.interface";
import AuthModel from "../models/auth.model";
import { IPhoneAuth } from "../../domain/interfaces/phone-auth.interface";
import PhoneAuthModel from "../models/phone-auth.model";

export type OTPConfirmation = Pick<IPhoneAuth, "phone" | "otp">;
class AuthService implements CRUD {

    public async authorize(credentials: ICredentials): Promise<any> {
        return AuthModel.findOne({
            username: credentials.username,
            password: credentials.password,
        })
            .select(['-password', '-confirm_password'])
            .populate({ path: 'user_group', select: '_id, name' })
            .populate({ path: 'role', select: '_id, name' })
            .populate({ path: 'user', select: '-password' });
    }

    public async list(limit?: number, page?: number): Promise<any> {
        return await UserModel.find()
            .select(['-password'])
            .limit(limit)
            .populate({ path: 'created_by', select: '-password' });
    }

    public async create(auth: IAuth): Promise<any> {
        var user = await new UserModel(auth.user).save();
        auth.user = user._id;
        return await new AuthModel(auth).save();
    }

    public async phoneAuth(phone: String): Promise<any>{
        let phoneAuth: IPhoneAuth = <IPhoneAuth>{
            phone,
            status: 'PENDING'
        };

        return await new PhoneAuthModel(phoneAuth).save();
    }

    public async confirmOTP(otpConfirmation: OTPConfirmation): Promise<any>{
        let phoneAuth: IPhoneAuth = <IPhoneAuth>{
            phone: otpConfirmation.phone,
            otp: otpConfirmation.otp,
            status: 'CONFIRMED'
        };

        return await new PhoneAuthModel(phoneAuth).save();
    }

    public async putById(id: string, user: IUser): Promise<any> {
        return await UserModel.updateOne({ _id: id }, user);
    }

    public async readById(id: string): Promise<any> {
        return await UserModel.findById(id);
    }

    public async readByUserGroupId(groupId: string): Promise<any> {
        return await UserModel.find({ user_group: groupId });
    }

    public async deleteById(id: string): Promise<any> {
        return await UserModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, resource: any): Promise<any> {

    }
}

export default new AuthService();
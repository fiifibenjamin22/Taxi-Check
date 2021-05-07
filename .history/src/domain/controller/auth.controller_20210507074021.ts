import logging from "../../core/logging";
import { Route, Controller, Get, Body, SuccessResponse, Post, Tags, Res, TsoaResponse, Response, Query, Delete, Path } from "tsoa";
import { ICredentials } from "../interfaces/credentials.interface";
import AuthService from "../../data/services/auth.service";
import { IUser } from "../interfaces/user.interface";
import { IUserGroup } from "../interfaces/user-group.interface";
import { IRole } from "../interfaces/role.interface";
import { IErrorResponse, IApiResponse } from "../../core/helpers/responses.interface";
import RoleService from "../../data/services/role.service";

const NAMESPACE = 'AUTH CONTROLLER';
@Route("/api/auth")
@Tags('Auth')
export class AuthController extends Controller {

    @Get('/all')
    public async getAll(@Query() limit?: number, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get all users');

        let users: any[] = await AuthService.list(limit);
        if (!users || users.length == 0) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: users };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @Post('/login')
    public async loginUser(@Body() credentials: ICredentials, @Res() notAuthorized?: TsoaResponse<401, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Login user');

        let user: any = await AuthService.authorize(credentials);
        if (!user) notAuthorized(401, { message: "Invalid Credentials" });

        return { 'message': "Authorized", data: user };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async createUser(@Body() user: IUser): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create new user');

        this.setStatus(201);

        return await AuthService.create(user);
    }

    @Delete('/delete/{userId}')
    public async delete(@Path() userId: string): Promise<void> {
        logging.info(NAMESPACE, 'Delete user');

        return await AuthService.deleteById(userId);
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create/userGroup')
    public async createUserGroup(@Body() userGroup: IUserGroup): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create new user group');

        this.setStatus(201);

        return await AuthService.addUserGroup(userGroup);
    }

    @Get('/all/userGroups')
    public async getAllUserGroups(@Query() limit?: number, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get all user groups');

        let userGroups: any[] = await AuthService.listUserGroups(limit);
        if (!userGroups || userGroups.length == 0) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: userGroups };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create/userRole')
    public async createRole(@Body() role: IRole): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create new user role');

        this.setStatus(201);

        return await AuthService.addUserRole(role);
    }

    @Get('/all/userRoles')
    public async getAllUserRoles(@Query() limit?: number, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get all user roles');

        let userRoles: any[] = await RoleService.list(limit);
        if (!userRoles || userRoles.length == 0) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: userRoles };
    }

    @Get('/find/roleByGroupId/{groupId}')
    public async findRoleByGroupId(@Path() groupId: string, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Find role by group Id');

        let vehicle: any = await RoleService.readByGroupId(groupId);

        if (!vehicle) notFoundResponse(404, { message: "No record found" });

        return { 'message': "Fetched", data: vehicle };
    }
}
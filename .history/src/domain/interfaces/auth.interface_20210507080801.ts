export interface IAuth{
    username: string, 
    password: string,
    confirm_password: string,
    requires_password_reset: string,
    user_group: string,
    role: string,
    institution_id: string,
    user_info: string
}
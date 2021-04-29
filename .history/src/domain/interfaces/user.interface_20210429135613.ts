export interface IUser {
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    user_group?: "administrator" | "support" | "security" | "assembly" | "user",
    role?: "administrator" | "maintainer" | "viewer" | "user",
    created_by: string
}
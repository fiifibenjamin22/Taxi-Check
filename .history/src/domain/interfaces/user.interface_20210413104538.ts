export interface IUser{
    id: string,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    role?: "municipal-assembly" | "municipal-assembly-admin" | "police" | "police-admin" | "consumer" | "admin",
}
import mongoose from 'mongoose';

export interface IUser{
    id?: string,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    user_group?: "admin" | "municipal-assembly" | "police" | "user",
    role?: "admin" | "mediator" | "commenter",
}
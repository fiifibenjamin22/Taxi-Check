import mongoose from 'mongoose';

export interface IUser{
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    user_group?: "admin" | "municipal-assembly" | "police" | "user",
    role?: "admin" | "mediator" | "commenter",
    created_by: string
}
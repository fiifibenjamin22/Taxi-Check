export interface IUser {
    first_name: string,
    last_name: string,
    contact: { email: string, phone: string },
    address: { ghana_post: string, physical_address: string },
    created_by: string
}
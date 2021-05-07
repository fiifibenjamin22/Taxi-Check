export interface IUser {
    first_name: string,
    last_name: string,
    contacts: { email: string, phone: string }
    address: { ghana_post: string, physical_address: string }
}
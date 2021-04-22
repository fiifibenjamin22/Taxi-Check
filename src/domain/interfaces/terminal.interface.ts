export interface ITerminal {
    terminal_name: string,
    contact: { phone_number: string, email: string },
    address: { physical_address: string, postal_address: string, ghana_post: string },
    terminal_master_id: string,
    created_by: string
}
export interface IDriver {
    first_name: string,
    last_name: string,
    other_names?: string,
    dob: string,
    gender?: "male" | "female",
    license: { number: string, class: string },
    contact: { phone_number: string, email: string },
    address: { residential_address: string, postal_address: string, ghana_post: string },
    identification: { id_type: string, number: string },
    tin: string,
    municipal_assembly?: string,
    created_by: string,
}
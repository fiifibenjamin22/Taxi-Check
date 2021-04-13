export interface IDriver{
    first_name: string,
    last_name: string,
    other_names: string,
    license: { number: string, class: string },
    address: { residential_address: string, ghana_post: string },
    identification: { id_type: string, number: string },
    tin: string,
    createdBy: string,
}
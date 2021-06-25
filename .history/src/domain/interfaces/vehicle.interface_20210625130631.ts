export interface IVehicle {
    make: string,
    model: string,
    chasis_number: string,
    plate_number: string,
    registration_date: string,
    owner?: string,
    driver?: string,
    created_by: string,
}
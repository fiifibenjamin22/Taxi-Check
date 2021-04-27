export interface IVehicle {
    make: string,
    model: string,
    chasis_number: string,
    plate_number: string,
    registration_date: string,
    municipal_assembly?: string,
    terminal?: string,
    owner?: string,
    driver?: string
}
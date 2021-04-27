export interface IVehicle {
    make: string,
    model: string,
    chasis_number: string,
    plate_number: string,
    registration_date: string,
    municipal_assembly?: string | null,
    terminal?: string | null,
    owner?: string | null,
    driver?: string | null
}
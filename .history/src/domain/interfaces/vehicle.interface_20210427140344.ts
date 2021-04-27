import { IOwner } from "./owner.interface";

export interface IVehicle {
    make: String,
    model: String,
    chasis_number: String,
    plate_number: String,
    registration_date: String,
    municipal_assembly?: String,
    terminal?: String,
    owner?: String,
    driver?: string
}
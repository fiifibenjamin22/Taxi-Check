export interface IComplaints{
    vehicle_plate: string,
    reported_by: string,
    assigned_to?: string,
    reason?: string,
    comments?: string,
    status: "PENDING" | "ASSIGNED" | "ACTION_TAKEN",
}
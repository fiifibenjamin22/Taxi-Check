export interface IComplaints{
    vehicle: string,
    reported_by: string,
    assigned_to: string,
    status: "PENDING" | "ASSIGNED" | "ACTION_TAKEN",
}
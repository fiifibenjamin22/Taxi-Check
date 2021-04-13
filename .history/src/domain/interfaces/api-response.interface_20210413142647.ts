export interface IApiResponse {
    message: String,
    data?: any,
    error?: { message: string, errors: any[] }
}
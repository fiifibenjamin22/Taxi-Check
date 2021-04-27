export interface IApiResponse {
    message: string,
    data?: any,
    details?: { [name: string]: unknown },
    count?: number
}
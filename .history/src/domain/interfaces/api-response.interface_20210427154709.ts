export interface IApiResponse {
    message: string,
    data?: any,
    count?: number
}

export interface IErrorResponse {
    message: string,
    details?: { [name: string]: unknown },
}
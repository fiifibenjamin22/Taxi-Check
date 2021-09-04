export interface ICallback {
    zeepay_id: string;
    reference: string;
    status: string;
    code: string;
    message: string;
    gateway_id: string;
}
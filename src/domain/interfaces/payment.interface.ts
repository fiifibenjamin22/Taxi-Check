export interface IPayment {
    customerName: string,
    mno: string,
    amount: number,
    msisdn: string,
    description: string,
    reference: string,
    status?: string,
    message?: string,
}

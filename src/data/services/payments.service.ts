import * as settings from '../../app.settings.json';
//import async
import async from 'async';
import axios from 'axios';
import qs from 'querystring';
import { mongo } from 'mongoose';
import { IPayment } from '../../domain/interfaces/payment.interface';
import PaymentModel from '../models/payment.model';
import { ICallback } from '../../domain/interfaces/callback.interface';

class PaymentsService {
    
    //Generate Auth Token
    public async initiatePayment(paymentBody: IPayment): Promise<any> {
        const url = settings.ZEE_PAY.TEST_BASE_URL + settings.ZEE_PAY.AUTH_TOKEN;
        console.log(url);

        const options: any = {
            method: "POST",
            url: url,
            body: JSON.stringify( {
                "grant_type": settings.ZEE_PAY.grant_type,
                "client_id": settings.ZEE_PAY.client_id,
                "client_secret": settings.ZEE_PAY.client_secret,
                "scope": settings.ZEE_PAY.scope,
                "username": settings.ZEE_PAY.username,
                "password": settings.ZEE_PAY.password
            }),
            data: {
                "grant_type": settings.ZEE_PAY.grant_type,
                "client_id": settings.ZEE_PAY.client_id,
                "client_secret": settings.ZEE_PAY.client_secret,
                "scope": settings.ZEE_PAY.scope,
                "username": settings.ZEE_PAY.username,
                "password": settings.ZEE_PAY.password
            },
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        //return token
        return axios(options)
            .then(response => {
                return this.makePayment(paymentBody, response.data.access_token);
            })
            .catch(error => {
                console.log(error);
                return error.message;
            });
    }

    //use generated token to to make payment
    public async makePayment(paymentBody: IPayment, token: string): Promise<any> {
        const url = "https://test.digitaltermination.com/api/custom/transactions/tech-maxx/wallets/debit-wallet";

        const options: any = {
            method: "POST",
            url: url,
            body: JSON.stringify( {
                "customerName":paymentBody.customerName,
                "mno":paymentBody.mno,
                "amount": paymentBody.amount,
                "msisdn":paymentBody.msisdn,
                "description":paymentBody.description,
                "reference":paymentBody.reference,
                "callback_ur": "host" + "/api/payments/credit/wallet/callback"
            }),
            data: {
                "customerName":paymentBody.customerName,
                "mno":paymentBody.mno,
                "amount": paymentBody.amount,
                "msisdn":paymentBody.msisdn,
                "description":paymentBody.description,
                "reference":paymentBody.reference,
                "callback_ur": "host" + "api/payments/credit/wallet/callback"
            },
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        };
        //return token
        return axios(options)
            .then(response => {
                let paymentInstance = this.createPayment(paymentBody);
                console.log(paymentInstance);
                return paymentInstance;
            })
            .catch(error => {
                console.log(error);
                return error.message;
            });
    }

    //create payment in db
    public async createPayment(paymentBody: IPayment): Promise<any> {
        return await new PaymentModel(paymentBody).save();
    }

    //payment callback
    public async paymentCallback(callbackBody: ICallback): Promise<any> {
        let paymentInstance: IPayment = await this.getPaymentInstance(callbackBody.reference);
        let paymentObject = await this.updatePaymentInstance(callbackBody, paymentInstance);
        return paymentObject;
    }

    //get payment details
    public async updatePaymentInstance(callbackBody: ICallback, payment: any): Promise<any> {
        let updateData = {'status': callbackBody.status, 'message': callbackBody.message};
        let updated = await PaymentModel.findOneAndUpdate({ refence: payment.reference }, updateData, { new: true });
        return updated
    }

    public async getPaymentInstance(referenceId: string): Promise<any> {
        return await PaymentModel.find({ refence: referenceId });
    }
}

export default new PaymentsService();
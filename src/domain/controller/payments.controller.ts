import { json } from "body-parser";
import { Body, Controller, Get, Path, Post, Query, Res, Request, Route, Tags, TsoaResponse } from "tsoa";
import PaymentsService from "../../data/services/payments.service";
import { IApiResponse, IErrorResponse } from "../interfaces/common/responses.interface";
import async from "async";
import { IPayment } from "../interfaces/payment.interface";
import { ICallback } from "../interfaces/callback.interface";
import { request } from "express";

//namespace driver controller
const NAMESPACE = "Payments Controller";

@Route("/api/payments")
@Tags('Payment')
export class PaymentsController extends Controller {

    //get payment auth token from payments service
    @Post("/credit/wallet")
    public async makePayment(
        @Body() payment: IPayment,
        @Res() notFoundResponse? : TsoaResponse<404, IErrorResponse>
    ): Promise<IApiResponse> {
        let paymentResponse = await PaymentsService.initiatePayment(payment);
        return paymentResponse;
    }

    //payment callback_url
    @Post("/credit/wallet/callback")
    public async paymentCallback(
        @Body() callbackData: ICallback,
        @Res() notFoundResponse? : TsoaResponse<404, IErrorResponse>
    ): Promise<IApiResponse> {
        let paymentResponse = await PaymentsService.paymentCallback(callbackData);
        return paymentResponse;
    }
}
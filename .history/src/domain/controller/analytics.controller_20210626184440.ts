import { Controller, Get, Query, Route, Tags } from "tsoa";
import logging from "../../core/utils/logging";
import AnalyticsService from "../../data/services/analytics.service";
import { IApiResponse } from "../interfaces/common/responses.interface";

const NAMESPACE = 'Assembly Controller';
@Route("/api/analytics")
@Tags('Analytics')
export class AnalyticsController extends Controller {

    @Get('/overviews')
    public async getOverviews(@Query() from: string, @Query() to: string): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get all overviews');

        let overviews = await AnalyticsService.getOverviews(from, to);

        return { 'message': "Fetched", data: overviews };
    }

}
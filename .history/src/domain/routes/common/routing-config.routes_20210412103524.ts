
import ussdRouter from '../ussd.routes';
import vehicleRouter from '../vehicle.routes';
import logging from '../../../core/logging';
import express from 'express';

const NAMESPACE = 'Routing Config';
export class RoutingConfig {
    private app: express.Application;

    constructor(_app: express.Application) {
        this.app = _app;
        this.defineRoutes();
        this.logger();
    }

    private defineRoutes(): void {
        this.app.use('/ussd', ussdRouter);
        this.app.use('/vehicle', vehicleRouter);
    }

    private logger(): void {
        // Handle route not found
        this.app.use((req, res, next) => {
            const error = new Error(`Not found ${req.url}`);

            return res.status(404).json({
                message: error.message
            });
        });

        this.app.use((req, res, next) => {
            logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                .socket.remoteAddress}]`);

            res.on('finish', () => {
                logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                    .socket.remoteAddress}], STATUS - [${res.statusCode}]`);
            });
        });
    }
}
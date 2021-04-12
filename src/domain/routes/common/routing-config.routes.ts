
import ussdRouter from '../ussd.routes';
import vehicleRouter from '../vehicle.routes';
import logging from '../../../core/logging';
import express from 'express';
import { AuthRoutes } from '../auth.routes';
import { DriverRoutes } from '../driver.routes';

const NAMESPACE = 'Routing Config';
export class RoutingConfig {
    private app: express.Application;

    constructor(_app: express.Application) {
        this.app = _app;

        this.defineRoutes();
        this.extraHandler();
    }

    private defineRoutes(): void {
        this.app.use('/ussd', ussdRouter);
        this.app.use('/vehicle', vehicleRouter);
        this.app.use('/api/auth', new AuthRoutes().router);
        this.app.use('/api/drivers', new DriverRoutes().router);
    }

    private extraHandler(): void {
        // Handle route not found
        this.app.use((req, res, next) => {
            const error = new Error(`Not found ${req.url}`);

            res.status(404).json({
                message: error.message
            });

            logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                .socket.remoteAddress}]`);

            res.on('finish', () => {
                logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                    .socket.remoteAddress}], STATUS - [${res.statusCode}]`);
            });
        });
    }
}
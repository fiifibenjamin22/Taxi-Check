
import ussdRouter from '../ussd.routes';
import vehicleRouter from '../vehicle.routes';
import logging from '../../../core/logging';
import express from 'express';
import { AuthRoutes } from '../auth.routes';
import { DriverRoutes } from '../driver.routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Taxi Check API',
        version: '1.0.0',
        license: { name: 'Licensed Under MIT', url: 'https://spdx.org/licenses/MIT.html' },
        contact: { name: 'Yours truly', url: 'taxi-check-engine.io' }
    },
    servers: [
        { url: 'http://0.0.0.0:3000', description: 'Development server' },
        { url: 'https://taxi-check-engine.herokuapp.com/', description: 'Test server' },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['../*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const NAMESPACE = 'Routing Config';
export class RoutingConfig {
    private app: express.Application;

    constructor(_app: express.Application) {
        this.app = _app;

        this.defineRoutes();
        this.extraHandler();
    }

    private defineRoutes(): void {
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this.app.use('/ussd', ussdRouter);
        this.app.use('/vehicle', vehicleRouter);
        this.app.use('/api/auth', new AuthRoutes().router);
        this.app.use('/api/drivers', new DriverRoutes().router);
    }

    private extraHandler(): void {
        // Handle route not found
        this.app.use((req, res, next) => {
            const error = new Error(`Not found ${req.url}`);

            res.status(404).json({ message: error.message });

            logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                .socket.remoteAddress}]`);

            res.on('finish', () => {
                logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                    .socket.remoteAddress}], STATUS - [${res.statusCode}]`);
            });
        });
    }
}

import ussdRouter from '../ussd.routes';
import vehicleRouter from '../vehicle.routes';
import logging from '../../../core/logging';
import express from 'express';
import { AuthRoutes } from '../auth.routes';
import { DriverRoutes } from '../driver.routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
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
        ]
    },
    apis: ['../*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const NAMESPACE = 'Routing Config';
export class RoutingConfig {

    constructor(private app: express.Application) {

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
        this.app.use((req, res) => {
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
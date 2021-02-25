
import ussdRouter from '../controller/routes/ussd.routes';
import vehicleRouter from '../controller/routes/vehicle.route';
import logging from './logging';

const NAMESPACE = 'Routing';
export class Routing {

    constructor(private app) {

        // Init routes
        this.defineRoutes();

        // Handle route not found
        this.app.use((req, res, next) => {
            const error = new Error(`Not found ${req.url}`);

            return res.status(404).json({
                message: error.message
            });
        });

        this.logger();
    }

    private defineRoutes(): void {
        this.app.use('/ussd', ussdRouter);
        this.app.use('/vehicle', vehicleRouter);
    }

    private logger(): void {
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
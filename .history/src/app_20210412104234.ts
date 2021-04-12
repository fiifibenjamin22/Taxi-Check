import express from 'express';
import bodyParser from 'body-parser';
import logging from './core/logging';
import config from './core/setup.config';
import http from 'http';
import cors from 'cors';
import { DatabaseConfig } from './data/datasource/database.config';
import { RoutingConfig } from './domain/routes/common/routing-config.routes';

const NAMESPACE = 'Server';
export default class App {
    private server: http.Server;
    private app = express();

    constructor() {
        this.server = new http.Server(this.app);
        this.config();
    }

    public start(): void {
        this.server.listen(config.server.port, async () => {
            try {
                logging.info(NAMESPACE, `Server listening on: ${config.server.hostname}:${config.server.port}.`);
            } catch (e) {
                logging.info(NAMESPACE, e);
            }
        });
    }

    private config(): void {
        this.app.use(
            express.json({ limit: '50mb' }),
            express.urlencoded({
                extended: false, limit: '50mb',
                parameterLimit: 50000
            }),
            cors()
        );
        new DatabaseConfig();
        new RoutingConfig(this.app);
    }
}

new App().start();
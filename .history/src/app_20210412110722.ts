import express from 'express';
import logging from './core/logging';
import http from 'http';
import cors from 'cors';
import { DatabaseConfig } from './data/datasource/database.config';
import { RoutingConfig } from './domain/routes/common/routing-config.routes';
import * as settings from './app.settings.json';

const NAMESPACE = 'Server';
export default class App {
    private server: http.Server;
    private app = express();

    constructor() {
        this.server = new http.Server(this.app);
        this.config();
    }

    public start(): void {
        let port = process.env.PORT || settings.SERVER.PORT;
        this.server.listen(port, async () => {
            try {
                logging.info(NAMESPACE, `Server listening on: ${settings.SERVER.HOSTNAME}:${port}.`);
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
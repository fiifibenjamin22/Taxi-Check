import express from 'express';
import logging from './core/utils/logging';
import http from 'http';
import cors from 'cors';
import { DatabaseConfig } from './data/datasource/database.config';
import * as settings from './app.settings.json';
import { RoutesConfig } from './core/utils/routes.config';
import SMSHelper  from './core/helpers/sms.helper';

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
        SMSHelper.sendSMS();
    }

    private config(): void {
        this.app.use(
            cors(),
            express.json({ limit: '50mb' }),
            express.urlencoded({
                extended: false, limit: '50mb',
                parameterLimit: 50000
            })
        );
        new DatabaseConfig();
        new RoutesConfig(this.app);
    }

}

new App().start();
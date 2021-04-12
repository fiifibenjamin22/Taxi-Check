import express from 'express';
import bodyParser from 'body-parser';
import logging from './@core/logging';
import config from './@core/config/setup.config';
import http from 'http';
import cors from 'cors';
import { DatabaseConfig } from './@core/config/database.config';
import { Routing } from './@core/routing';

const NAMESPACE = 'Server';
export default class App {
    private server: http.Server;
    private app = express();

    constructor() {
        new DatabaseConfig();

        // Parse request
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        // Cors handler
        this.app.use(cors());

        // Init routes
        new Routing(this.app);

        // Init server
        this.server = new http.Server(this.app);

        /* Listening to server instance */
        this.server.listen(config.server.port, async () => {
            try {
                logging.info(NAMESPACE, `Server listening on: ${config.server.hostname}:${config.server.port}.`);
            } catch (e) {
                logging.info(NAMESPACE, e);
            }
        });
    }
}

// Start app
new App();
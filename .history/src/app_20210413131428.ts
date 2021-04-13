import express from 'express';
import logging from './core/logging';
import http from 'http';
import cors from 'cors';
import { DatabaseConfig } from './data/datasource/database.config';
import * as settings from './app.settings.json';
import * as swaggerDocument from './swagger.json';
import * as swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from "./routes";

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
            cors(),
            express.json({ limit: '50mb' }),
            express.urlencoded({
                extended: false, limit: '50mb',
                parameterLimit: 50000
            })
        );
        new DatabaseConfig();
        RegisterRoutes(this.app);
        this.setupSwagger();
    }

    private setupSwagger(): void{
        try{
            this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        } catch(e){
            logging.debug(NAMESPACE, "Loading swagger json failed", e);
        }
    }
}

new App().start();
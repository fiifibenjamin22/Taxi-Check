import { Hidden } from "@tsoa/runtime";
import express from "express";
import logging from "./logging";
import * as swaggerDocument from '../swagger.json';
import * as swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from "../routes";

const NAMESPACE = "Routes Config";
export class RoutesConfig {
    constructor(private app: express.Application) {

        this.defineRoutes();
        this.extraHandler();
    }

    private defineRoutes(): void {
        RegisterRoutes(this.app);
        this.app.use('/ussd');
        this.setupSwagger();
    }

    private setupSwagger(): void {
        try {
            this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        } catch (e) {
            logging.debug(NAMESPACE, "Loading swagger json failed", e);
        }
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
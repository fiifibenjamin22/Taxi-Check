import { Hidden } from "@tsoa/runtime";
import express from "express";
import logging from "./logging";

const NAMESPACE = "Routes Config";
export class RoutesConfig {
    constructor(private app: express.Application) {

        this.defineRoutes();
        this.extraHandler();
    }

    private defineRoutes(): void {
        this.app.use('/ussd');
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
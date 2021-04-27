import express, { NextFunction, Request, Response } from "express";
import logging from "./logging";
import * as swaggerDocument from '../swagger.json';
import * as swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from "../routes";
import { UssdRoutes } from "../domain/ussd/ussd.routes";
import { ValidateError } from "tsoa";

const NAMESPACE = "Routes Config";
export class RoutesConfig {
    constructor(private app: express.Application) {
        this.defineRoutes();
        this.extraHandler();
    }

    private defineRoutes(): void {
        RegisterRoutes(this.app);

        this.app.use('/ussd', new UssdRoutes().router);
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
        this.app.use((err: unknown, req, res, next) => {

            if (err instanceof ValidateError) {
                logging.warn(NAMESPACE, `Caught Validation Error for ${req.path}:`, err.fields);
                return res.status(422).json({
                    message: "Validation Failed",
                    details: err?.fields,
                });
            }

            if (err instanceof Error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                });
            }


            res.status(404).json({
                message: new Error(`Not found ${req.url}`)
            });

            logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                .socket.remoteAddress}]`);

            res.on('finish', () => {
                logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                    .socket.remoteAddress}], STATUS - [${res.statusCode}]`);
            });

            next();
        });
    }

}
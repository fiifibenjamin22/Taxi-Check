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

        
        this.app.use(function notFoundHandler(req, res: Response) {
            logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
            res.status(404).send({ message: new Error(`Not found ${req.url}`) });
        });

        this.app.use(function errorHandler(
            err: unknown,
            req: Request,
            res: Response,
            next: NextFunction
        ): Response | void {
            logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

            if (err instanceof ValidateError) {
                console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
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

            next();
        });

        this.app.use(function notFoundHandler(req, res: Response) {
            res.on('finish', () => {
                logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                    .socket.remoteAddress}], STATUS - [${res.statusCode}]`);
            });
        });
    }

}
import mongoose from 'mongoose';
import logging from '../../core/logging';
import * as settings from '../../app.settings.json';

const NAMESPACE = 'Database Config';
export class DatabaseConfig {

    constructor() {

        logging.info(NAMESPACE, `Environment: ${process.env}`)

        let mongoConfig = process.env.NODE_ENV !== 'development' ? settings.MONGO.REMOTE : settings.MONGO.LOCAL;

        mongoose.connect(mongoConfig.URI, mongoConfig.OPTIONS)
            .then((_) => logging.info(NAMESPACE, `Connected to mongoDB! ${mongoConfig.URI}`))
            .catch((error) => logging.error(NAMESPACE, error.message, error))
    }
}
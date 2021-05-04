import mongoose from 'mongoose';
import logging from '../../core/logging';
import * as settings from '../../app.settings.json';

const NAMESPACE = 'Database Config';
export class DatabaseConfig {

    constructor() {
        let mongoConfig = process.env.NODE_ENV !== 'production' ? settings.MONGO.REMOTE : settings.MONGO.REMOTE;

        mongoose.connect(mongoConfig.URI, mongoConfig.OPTIONS)
            .then((_) => logging.info(NAMESPACE, `Connected to mongoDB!`))
            .catch((error) => logging.error(NAMESPACE, error.message, error))
    }
}
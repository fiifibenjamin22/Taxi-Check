import mongoose from 'mongoose';
import logging from '../../core/logging';
import * as settings from '../../app.settings.json';

const NAMESPACE = 'Database Config';
export class DatabaseConfig {

    constructor() {
        mongoose.connect(settings.MONGO.REMOTE.URI, settings.MONGO.REMOTE.OPTIONS)
            .then((_) => logging.info(NAMESPACE, 'Connected to mongoDB!'))
            .catch((error) => logging.error(NAMESPACE, error.message, error))
    }
}
import mongoose from 'mongoose';
import config from '../../core/setup.config';
import logging from '../../core/logging';

const NAMESPACE = 'Database Config';
export class DatabaseConfig {

    constructor() {
        mongoose.connect(config.mongo.url, config.mongo.options)
            .then((_) => logging.info(NAMESPACE, 'Connected to mongoDB!'))
            .catch((error) => logging.error(NAMESPACE, error.message, error))
    }
}
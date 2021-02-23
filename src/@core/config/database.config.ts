import mongoose from 'mongoose';
import config from './setup.config';
import logging from '../logging';

const NAMESPACE = 'Database Config';
export class DatabaseConfig {

    constructor() {
        mongoose.connect(config.mongo.url, config.mongo.options)
            .then((result) => logging.info(NAMESPACE, 'Connected to mongoDB!'))
            .catch((error) => logging.error(NAMESPACE, error.message, error))
    }
}
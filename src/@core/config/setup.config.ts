import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'root';
const MONGO_PASSWORD = process.env.MONGO_USERNAME || 'root';
const MONGO_HOST = process.env.MONGO_HOST || `cluster0.ao2w3.mongodb.net/toli-db`;

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || '0.0.0.0';
const SERVER_PORT = process.env.PORT || 3000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const SOCKET_EVENTS = {
    connect: 'connect',
    connect_error: 'connect_error',
    connect_timeout: 'connect_timeout',
    connecting: 'connecting',
    disconnect: 'disconnect',
    error: 'error',
    reconnect: 'reconnect',
    reconnect_attempt: 'reconnect_attempt',
    reconnect_failed: 'reconnect_failed',
    reconnect_error: 'reconnect_error',
    reconnecting: 'reconnecting',
  
    // Extras
    join: 'join',
    message: 'message',
    chatMessage: 'chatMessage',
    roomMembers: 'roomMembers',
  };
  
const REDIS_CONFIG = {
    host: 'ec2-54-235-167-86.compute-1.amazonaws.com',
    user: '',
    port: 7309,
    password: 'pdae53eb7f0f963112ac8899999548002ceb212e1b36805de655c24850fdf2202',
    uri: 'redis://:pdae53eb7f0f963112ac8899999548002ceb212e1b36805de655c24850fdf2202@ec2-54-235-167-86.compute-1.amazonaws.com:7309'
}

const config = {
    server: SERVER,
    mongo: MONGO,
    socket_events: SOCKET_EVENTS,
    redis_config: REDIS_CONFIG,
};

export default config;
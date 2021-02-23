import { deflate } from "zlib";

const ask = (question: String) => {
    return `CON ${question}`;
}

const say = (message: String) => {
    return `END ${message}`;
}

export default { ask, say }
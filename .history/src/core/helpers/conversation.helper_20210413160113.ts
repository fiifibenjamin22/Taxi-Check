export class Convo {
    public static ask = (question: String) => `CON ${question}`;
    public static say = (message: String) => `END ${message}`;
    public static divider = (): string => '\n-----------------\n';
}
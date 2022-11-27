import winston from "winston";

const logger = winston.createLogger({
    transports: [new winston.transports.Console({
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true
    })],
    exitOnError: false
});

const log = (context, message, scope) => {
    const dateNow = new Date();
    const obj = {
        timestamp: dateNow.toLocaleString(),
        context,
        scope,
        message: message
    };

    logger.info(obj);
};

export default { log };
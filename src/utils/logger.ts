import { format, transports, createLogger } from 'winston';

const { combine, timestamp, printf } = format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

export const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), logFormat),
    defaultMeta: { service: 'morphological-analyzer-service' },
    transports: [new transports.Console({})],
});

import { format, transports, createLogger } from 'winston';

const { combine, timestamp, printf } = format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const devTransports = [new transports.Console({})];
const prodTransports = [new transports.File({ filename: 'logs/logs.log' })];

export const logger = createLogger({
    format: combine(timestamp(), logFormat),
    defaultMeta: { service: 'morphological-analyzer-service' },
    transports: process.env.NODE_ENV === 'development' ? devTransports : prodTransports,
});

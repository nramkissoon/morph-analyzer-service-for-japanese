import { format, transports, createLogger } from 'winston';
import { S3StreamLogger } from 's3-streamlogger';
import { config } from 'dotenv';

config(); // config environment variables

const createTransports = (isProductionEnvironment: boolean) => {
    const prod_log_bucket_name = process.env.S3_LOG_BUCKET_NAME_PRODUCTION;
    const dev_log_bucket_name = process.env.S3_LOG_BUCKET_NAME_DEVELOPMENT;
    const aws_access_key = process.env.AWS_ACCESS_KEY_ID;
    const aws_secret_key = process.env.AWS_SECRET_ACCESS_KEY;
    if (isProductionEnvironment) {
        const s3_stream = new S3StreamLogger({
            bucket: prod_log_bucket_name,
            access_key_id: aws_access_key,
            secret_access_key: aws_secret_key,
        });
        return [new transports.Stream({ stream: s3_stream })];
    } else {
        const s3_stream = new S3StreamLogger({
            bucket: dev_log_bucket_name,
            access_key_id: aws_access_key,
            secret_access_key: aws_secret_key,
        });
        return [new transports.Stream({ stream: s3_stream }), new transports.Console({})];
    }
};

const { combine, timestamp, printf } = format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

export const logger = createLogger({
    format: combine(timestamp(), logFormat),
    defaultMeta: { service: 'morphological-analyzer-service' },
    transports: createTransports(process.env.NODE_ENV === 'production'),
});

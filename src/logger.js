import {createLogger, format, transports} from 'winston';

const logFormat = format.printf((info) => `${info.timestamp} ${info.level} ${JSON.stringify(info.metadata)}`);

const activeTransports = [];

if (process.env.NODE_ENV !== 'production') {
  activeTransports.push(new transports.Console({
    format: format.combine(
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.metadata({fillExcept: ['timestamp', 'level']}), // Format the metadata object
      format.colorize(),
      format.simple(),
      logFormat,
    ),
  }));
}

const logger = createLogger({
  level: 'debug',
  transports: activeTransports,
});

export default logger;

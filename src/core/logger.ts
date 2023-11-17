import path from "path";
import { IsProdMode } from "@config";
import { LoggerOptions, createLogger, format, transports } from "winston";

const logFormat = format.combine(
  format.timestamp(),
  format.colorize({
    colors: {
      info: 'green',
      error: 'red',
      fatal: 'red',
    },
  }),
  format.simple(),
  format.printf(({ message, timestamp }) => `:: ${message} [${timestamp}]`),
);

const _transports: LoggerOptions['transports'] = [
  new transports.Console({
    format: logFormat,
  }),
  new transports.File({
    filename: path.resolve(__dirname, '../logs/error.log'),
    level: 'error',
    format: format.combine(
      format.timestamp(),
      format.json(),
    ),
  }),
];

if (!IsProdMode) {
  _transports.push(
    new transports.File({
      filename: path.resolve(__dirname, '../logs/combined.log'),
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
    })
  );
}

export const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: _transports,
});

export interface LogContext {

  [key: string]: unknown;

}


export interface HmiLogger {

  debug(message: string, context?: LogContext): void;

  info(message: string, context?: LogContext): void;

  warn(message: string, context?: LogContext): void;

  error(message: string, context?: LogContext): void;

  fatal(message: string, context?: LogContext): void;

}
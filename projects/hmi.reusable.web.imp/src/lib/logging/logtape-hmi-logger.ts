import { getLogger } from '@logtape/logtape';
import {
  HmiLogger,
  LogContext,
} from 'hmi.reusable.web.ifc';

export class LogTapeHmiLogger implements HmiLogger {

  private readonly logger;

  constructor(category: string) {
    this.logger = getLogger(category);
  }

  debug(message: string, context?: LogContext): void {  
    this.logger.debug(message, context ?? {});
  }

  info(message: string, context?: LogContext): void {
    this.logger.info(message, context ?? {});
  }

  warn(message: string, context?: LogContext): void {
    this.logger.warn(message, context ?? {});
  }

  error(message: string, context?: LogContext): void {
    this.logger.error(message, context ?? {});
  }

  fatal(message: string, context?: LogContext): void {
    this.logger.fatal(message, context ?? {});
  }
}
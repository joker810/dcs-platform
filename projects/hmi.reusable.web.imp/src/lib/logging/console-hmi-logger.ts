import {
  HmiLogger,
  LogContext,
} from 'hmi.reusable.web.ifc';

export class ConsoleHmiLogger implements HmiLogger {

  constructor(private readonly category: string) {}

  debug(message: string, context?: LogContext): void {
    console.debug(this.format(message), context ?? {});
  }

  info(message: string, context?: LogContext): void {
    console.info(this.format(message), context ?? {});
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.format(message), context ?? {});
  }

  error(message: string, context?: LogContext): void {
    console.error(this.format(message), context ?? {});
  }

  fatal(message: string, context?: LogContext): void {
    console.error("[FATAL]", this.format(message), context ?? {});
  }

  private format(message: string): string {
    return `[${this.category}] ${message}`;
  }
}
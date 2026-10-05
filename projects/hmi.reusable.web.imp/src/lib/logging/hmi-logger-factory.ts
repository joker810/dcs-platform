import { InjectionToken } from '@angular/core';
import { HmiLogger } from 'hmi.reusable.web.ifc';
import { ConsoleHmiLogger } from './console-hmi-logger';
import { LogTapeHmiLogger } from './logtape-hmi-logger';

// Create a DI token using the interface contract
export const HMI_LOGGER_TOKEN = new InjectionToken<HmiLogger>('HmiLogger');

export function createHmiLogger(category: string): HmiLogger {
  return new LogTapeHmiLogger(category);
  // return new ConsoleHmiLogger(category);
}

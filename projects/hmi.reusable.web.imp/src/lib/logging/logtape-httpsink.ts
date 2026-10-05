import type { LogRecord, Sink } from '@logtape/logtape';

export function getHmiHttpSink(url: string): Sink {
  return (record: LogRecord): void => {
    void fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: record.timestamp,
        level: record.level,
        category: record.category.join('.'),
        message: record.message,
      }),
    }).catch(() => {
      // Logging must never break the application.
    });
  };
}
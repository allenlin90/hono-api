import { logger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

export function pinoLogger() {
  // DO NOT apply pino-pretty in production mode
  const prettify = process.env.NODE_ENV === 'production' ? undefined : pretty();

  const level = process.env.LOG_LEVEL || 'info';

  return logger({
    pino: pino({ level }, prettify),
    http: {
      // used for serverless ENV, e.g. LAMBDA, CB worker
      // otherwise, this is a counter from 1 when the server starts up
      reqId: () => crypto.randomUUID(),
    },
  });
}

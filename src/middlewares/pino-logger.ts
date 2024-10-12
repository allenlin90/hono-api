import { logger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

export function pinoLogger() {
  const prettify = process.env.NODE_ENV === 'production' ? undefined : pretty();

  return logger({
    pino: pino(prettify),
    http: {
      // used for serverless ENV, e.g. LAMBDA, CB worker
      // otherwise, this is a counter when server starts up
      reqId: () => crypto.randomUUID(),
    },
  });
}

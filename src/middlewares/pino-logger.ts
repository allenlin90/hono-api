import { logger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

import env from '@/env';

export function pinoLogger() {
  // DO NOT apply pino-pretty in production mode
  const prettify = env.NODE_ENV === 'production' ? undefined : pretty();

  return logger({
    pino: pino({ level: env.LOG_LEVEL }, prettify),
    http: {
      // used for serverless ENV, e.g. LAMBDA, CB worker
      // otherwise, this is a counter from 1 when the server starts up
      reqId: () => crypto.randomUUID(),
    },
  });
}

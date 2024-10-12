import type { PinoLogger } from 'hono-pino';

export interface AppBinding {
  Variables: {
    logger: PinoLogger;
  };
}

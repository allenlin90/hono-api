import type { PinoLogger } from 'hono-pino';
import { OpenAPIHono } from '@hono/zod-openapi';

import notFound from '@/middlewares/not-found';
import onError from '@/middlewares/on-error';
import { pinoLogger } from '@/middlewares/pino-logger';

type AppBinding = {
  Variables: {
    logger: PinoLogger;
  };
};

const app = new OpenAPIHono<AppBinding>();

app.use(pinoLogger());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/error', (c) => {
  c.var.logger.info('intended error');

  throw new Error('This is an error!');
});

app.notFound(notFound);

app.onError(onError);

export default app;

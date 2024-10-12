import type { PinoLogger } from 'hono-pino';
import { OpenAPIHono } from '@hono/zod-openapi';

import notFound from '@/middlewares/not-found';
import onError from '@/middlewares/on-error';
import { pinoLogger } from '@/middlewares/pino-logger';
import serveEmojiFavicon from '@/middlewares/serve-emoji-favicon';

type AppBinding = {
  Variables: {
    logger: PinoLogger;
  };
};

const app = new OpenAPIHono<AppBinding>();

app.use(pinoLogger());
app.use(serveEmojiFavicon('🎙️'));

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

import { OpenAPIHono } from '@hono/zod-openapi';

import notFound from '@/middlewares/not-found';
import onError from '@/middlewares/on-error';
import { pinoLogger } from '@/middlewares/pino-logger';
import serveEmojiFavicon from '@/middlewares/serve-emoji-favicon';

import type { AppBinding } from '@/lib/types';

export function createRouter() {
  return new OpenAPIHono<AppBinding>({
    strict: false,
  });
}

export default function createApp() {
  const app = new OpenAPIHono<AppBinding>({
    strict: false,
  });

  app.use(pinoLogger());
  app.use(serveEmojiFavicon('🎙️'));

  app.notFound(notFound);
  app.onError(onError);

  return app;
}

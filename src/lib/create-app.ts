import { OpenAPIHono } from '@hono/zod-openapi';

import notFound from '@/middlewares/not-found';
import onError from '@/middlewares/on-error';
import { pinoLogger } from '@/middlewares/pino-logger';
import serveEmojiFavicon from '@/middlewares/serve-emoji-favicon';

import type { AppBinding } from '@/lib/types';

import defaultHook from '@/openapi/default-hook';

export function createRouter() {
  return new OpenAPIHono<AppBinding>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  app.use(pinoLogger());
  app.use(serveEmojiFavicon('🎙️'));

  app.notFound(notFound);
  app.onError(onError);

  return app;
}

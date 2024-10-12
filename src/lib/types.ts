import type { OpenAPIHono } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';

export interface AppBinding {
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBinding>;

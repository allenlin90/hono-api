import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';

export interface AppBinding {
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBinding>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBinding
>;

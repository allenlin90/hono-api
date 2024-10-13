```
npm install
npm run dev
```

```
open http://localhost:3000
```

# Logger
1. Add `hono-pino` logger to AppBinding variables to be accessible in context `c`. 
   1. [hono-pino typing](https://github.com/maou-shonen/hono-pino/blob/HEAD/src/types.ts)
   2. [hono generics](https://hono.dev/docs/api/hono#generics)
2. Use `pino-pretty` only in `dev` mode and allow 3rd party monitoring service or server host to consume raw logs from `pino`. 
3. Config log `level` of the logger such as `info` (default). 
   1. Note that `console.log` is at `info` level.
   2. [log level](https://github.com/pinojs/pino/blob/main/docs/api.md#level-string)

# OpenAPI
1. [OpenAPI setup with app](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
2. [Scalar Hono](https://github.com/scalar/scalar/blob/main/packages/hono-api-reference/README.md)
3. `http://localhost:{{PORT}}/doc` to check on API documentation spec. 
4. `http://localhost:{{PORT}}/reference` to check on interactive scalar API reference.

## Validation
1. Added `defaultHook` in configuration to startup an `app` instance with `OpenAPIHono`.

# DB and Drizzle client 
1. `yarn drizzle-kit studio` to open an interactive database client to work with the DB.

# Generate client SDK for all routes or RPC spec
1. Check on `localhost:{{PORT}}/doc` to generate the SDK with openapi generator.

# Create Hono Client with RPC

```ts
// ./src/app.ts
import createApp from '@/lib/create-app';
import configureOpenAPI from '@/lib/configure-open-api';
import index from '@/routes/index.route';
import tasks from '@/routes/tasks/tasks.index';

const app = createApp();

const routes = [index, tasks] as const;

configureOpenAPI(app);

routes.forEach((route) => {
  app.route('/', route);
});

export type AppType = (typeof routes)[number];

export default app;
```

```ts
// for example
// ./src/lib/client.ts
import { hc } from 'hono/client';
import type { AppType } from '@/app';

// e.g. APP_HOST_URL=http://localhost:{{PORT}}
const client = hc<AppType>('APP_HOST_URL');
```

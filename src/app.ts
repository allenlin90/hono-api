import { OpenAPIHono } from '@hono/zod-openapi';

import notFound from '@/middlewares/not-found';
import onError from '@/middlewares/on-error';

const app = new OpenAPIHono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/error', (c) => {
  throw new Error('test error');
});

app.notFound(notFound);

app.onError(onError);

export default app;

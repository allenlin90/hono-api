import createApp from '@/lib/create-app';

const app = createApp();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/error', (c) => {
  c.var.logger.info('intended error');

  throw new Error('This is an error!');
});

export default app;

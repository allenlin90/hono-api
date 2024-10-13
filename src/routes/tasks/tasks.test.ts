import { describe, expect, expectTypeOf, it } from 'vitest';
import { testClient } from 'hono/testing';
import router from './tasks.index';
import createApp, { createTestApp } from '@/lib/create-app';

describe('tasks list', () => {
  it('responds with an array', async () => {
    const testRouter = createTestApp(router);

    const response = await testRouter.request('/tasks');
    const result = await response.json();

    // @ts-expect-error
    expectTypeOf(result).toBeArray();
  });

  it('responds with an array with hono test helper testClient', async () => {
    const testApp = createApp();
    const testRouter = testApp.route('/', router);
    const client = testClient(testRouter);

    const response = await client.tasks.$get();
    const json = await response.json();

    expectTypeOf(json).toBeArray();
  });
});

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
});

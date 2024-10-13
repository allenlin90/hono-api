// import fs from 'node:fs';
import { execSync } from 'node:child_process';

import {
  // afterAll,
  beforeAll,
  describe,
  expect,
  expectTypeOf,
  it,
} from 'vitest';
import { testClient } from 'hono/testing';

import env from '@/env';
import createApp, { createTestApp } from '@/lib/create-app';

import router from './tasks.index';

if (env.NODE_ENV !== 'test') {
  throw new Error("NODE_ENV must be 'test'");
}

const client = testClient(createApp().route('/', router));

describe('tasks list', () => {
  beforeAll(async () => {
    execSync('yarn drizzle-kit push');
  });

  // TODO: cleanup test db
  // afterAll(async () => {
  //   fs.rmSync('test.db', { force: true });
  // })

  it('responds with an array', async () => {
    const testRouter = createTestApp(router);

    const response = await testRouter.request('/tasks');
    const result = await response.json();

    // @ts-expect-error
    expectTypeOf(result).toBeArray();
  });

  it('responds with an array with hono test helper testClient', async () => {
    const response = await client.tasks.$get();
    const json = await response.json();

    expectTypeOf(json).toBeArray();
  });

  it('validates the id param', async () => {
    const response = await client.tasks[':id'].$get({
      param: {
        id: 'wat',
      },
    });

    expect(response.status).toBe(422);
  });

  it('validates the body when creating', async () => {
    const response = await client.tasks.$post({
      // @ts-expect-error
      json: {
        name: 'Learn vitest',
      },
    });

    expect(response.status).toBe(422);
  });
});

import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from '@/http-status-codes';
import jsonContent from '@/openapi/helpers/json-content';
import { insertTasksSchema, selectTasksSchema } from '@/db/schema';
import jsonContentRequired from '@/openapi/helpers/json-content-required';

const tags = ['Tasks'];

export const list = createRoute({
  tags,
  path: '/tasks',
  method: 'get',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksSchema),
      'The list of tasks'
    ),
  },
});

export const create = createRoute({
  tags,
  path: '/tasks',
  method: 'post',
  request: {
    body: jsonContentRequired(insertTasksSchema, 'The task to create'),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectTasksSchema,
      'The created task'
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;

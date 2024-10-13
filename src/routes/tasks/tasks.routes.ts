import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from '@/http-status-codes';
import jsonContent from '@/openapi/helpers/json-content';
import { insertTasksSchema, selectTasksSchema } from '@/db/schema';
import jsonContentRequired from '@/openapi/helpers/json-content-required';
import createErrorSchema from '@/openapi/schemas/create-error-schema';
import IdParamsSchema from '@/openapi/schemas/id-params';
import { notFoundSchema } from '@/db/constants';

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
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      'The validation error(s)'
    ),
  },
});

export const getOne = createRoute({
  tags,
  path: '/tasks/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The requested task'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;

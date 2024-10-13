import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from '@/http-status-codes';
import jsonContent from '@/openapi/helpers/json-content';

const list = createRoute({
  path: '/tasks',
  method: 'get',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(
        z.object({
          name: z.string(),
          done: z.boolean(),
        })
      ),
      'The list of tasks'
    ),
  },
});

export type ListRoute = typeof list;

import { createRoute, z } from '@hono/zod-openapi';
import { createRouter } from '@/lib/create-app';
import * as HttpStatusCodes from '@/http-status-codes';
import jsonContent from '@/openapi/helpers/json-content';
import createMessageObjectSchema from '@/openapi/schemas/create-message-object';

const router = createRouter().openapi(
  createRoute({
    tag: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema('Hono API'),
        'Hono API Index'
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: 'Hono API',
      },
      HttpStatusCodes.OK
    );
  }
);

export default router;

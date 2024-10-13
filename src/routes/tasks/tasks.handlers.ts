import db from '@/db';
import { tasks } from '@/db/schema';
import type { AppRouteHandler } from '@/lib/types';
import type {
  CreateRoute,
  GetOneRoute,
  ListRoute,
} from '@/routes/tasks/tasks.routes';
import * as HttpStatusCodes from '@/http-status-codes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json');
  const [inserted] = await db.insert(tasks).values(task).returning();
  return c.json(inserted, HttpStatusCodes.CREATED);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const task = await db.query.tasks.findFirst({
    where: (fields, operators) => {
      return operators.eq(fields.id, id);
    },
  });
  return c.json(task, HttpStatusCodes.OK);
};

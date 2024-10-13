import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z, type ZodError } from 'zod';

expand(config());

const EnvSchema = z
  .object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']), // pino.level
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'undefined',
        path: ['DATABASE_AUTH_TOKEN'],
        message: 'DATABASE_AUTH_TOKEN is required in production',
      });
    }
  });

export type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;

  console.error('invalid ENV');
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;

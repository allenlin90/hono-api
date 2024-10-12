import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z, type ZodError } from 'zod';

expand(config());

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']), // pino.level
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

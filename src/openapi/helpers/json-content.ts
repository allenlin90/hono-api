import type { ZodSchema } from '@/openapi/helpers/types';

export default function jsonContent<T extends ZodSchema>(
  schema: T,
  description: string
) {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description,
  };
}

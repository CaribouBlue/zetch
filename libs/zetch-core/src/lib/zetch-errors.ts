import { ZodError } from 'zod';

export class ZetchParseError extends Error {
  cause: ZodError;

  constructor(cause: ZodError) {
    super('Failed to parse json body');

    this.cause = cause;
  }
}

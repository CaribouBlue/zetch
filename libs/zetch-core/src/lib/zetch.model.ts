import { z, ZodTypeAny } from 'zod';

export interface ZetchConfig<Schema extends ZodTypeAny> extends RequestInit {
  jsonSchema?: Schema;
}

export interface ZetchResponse<Data> extends Response {
  data: Data;
}

export type ZetchInferResponse<Schema extends ZodTypeAny> = ZetchResponse<
  z.infer<Schema>
>;

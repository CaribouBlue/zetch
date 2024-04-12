import { merge } from 'ts-deepmerge';
import { ZodTypeAny } from 'zod';
import { ZetchConfig, ZetchInferResponse } from './zetch.model';
import { ZetchParseError } from './zetch-errors';

class Zetch {
  config: RequestInit = {};

  constructor(config?: RequestInit) {
    this.config = config ?? this.config;
  }

  async request<Schema extends ZodTypeAny>(
    url: URL | RequestInfo,
    config: ZetchConfig<Schema> = {}
  ): Promise<ZetchInferResponse<Schema>> {
    const mergedConfig = merge(this.config, config);

    const response = await fetch(url, mergedConfig);

    const { jsonSchema } = config;
    let data;
    if (jsonSchema) {
      const jsonBody = await response.json();
      const parsedData = jsonSchema.safeParse(jsonBody);
      if (parsedData.success) {
        data = parsedData.data;
      } else {
        throw new ZetchParseError(parsedData.error);
      }
    }

    return Object.assign(response, { data });
  }

  async get<Schema extends ZodTypeAny>(
    url: URL | RequestInfo,
    config: ZetchConfig<Schema> = {}
  ) {
    return this.request(url, { ...config, method: 'GET' });
  }

  async post<Schema extends ZodTypeAny>(
    url: URL | RequestInfo,
    config: ZetchConfig<Schema> = {}
  ) {
    return this.request(url, { ...config, method: 'POST' });
  }

  async put<Schema extends ZodTypeAny>(
    url: URL | RequestInfo,
    config: ZetchConfig<Schema> = {}
  ) {
    return this.request(url, { ...config, method: 'PUT' });
  }

  async patch<Schema extends ZodTypeAny>(
    url: URL | RequestInfo,
    config: ZetchConfig<Schema> = {}
  ) {
    return this.request(url, { ...config, method: 'PATCH' });
  }

  async delete<Schema extends ZodTypeAny>(
    url: URL | RequestInfo,
    config: ZetchConfig<Schema> = {}
  ) {
    return this.request(url, { ...config, method: 'DELETE' });
  }

  create(...args: ConstructorParameters<typeof Zetch>) {
    return new Zetch(...args);
  }
}

export const zetch = new Zetch();

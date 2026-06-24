/* eslint-disable @typescript-eslint/no-explicit-any */
type Params = {
  [key: string]: unknown;
};

export interface HttpClient {
  get: (url: string, params?: Params) => Promise<any>;
  put: (url: string, body: unknown) => Promise<any>;
  post: (url: string, body: unknown) => Promise<any>;
  patch: (url: string, body?: unknown) => Promise<any>;
  delete: (url: string, data?: unknown, params?: unknown) => Promise<any>;
}

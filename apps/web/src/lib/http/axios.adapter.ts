/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance } from "axios";
import type { HttpClient } from "./http-client";

export class AxiosAdapter implements HttpClient {
  constructor(private readonly api: AxiosInstance) {}

  async get(url: string, params?: { [key: string]: unknown }): Promise<any> {
    const response = await this.api.get(url, { params });
    return response.data;
  }

  async post(url: string, body: unknown): Promise<any> {
    const response = await this.api.post(url, body);
    return response.data;
  }

  async put(url: string, body: unknown): Promise<any> {
    const response = await this.api.put(url, body);
    return response.data;
  }

  async patch(url: string, body?: unknown): Promise<any> {
    const response = await this.api.patch(url, body);
    return response.data;
  }

  async delete(url: string, data?: unknown, params?: unknown): Promise<any> {
    const response = await this.api.delete(url, { data, params });
    return response.data;
  }
}

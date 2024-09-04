import fetch from 'isomorphic-unfetch';

type Config = {
  apiKey?: string;
  // baseUrl: string;
};

export abstract class Base {
  private apiKey: string;
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(config: Config) {
    this.apiKey = config.apiKey ?? 'xyz';
    this.baseUrl = 'http://localhost:3456/api/v1';
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  protected async request<T>(endpoint: string, options?: RequestInit, authorize?:boolean): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `${this.apiKey}`,
      ...(authorize && this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {}),
    };
    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorBody}`);
      }

      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }
}
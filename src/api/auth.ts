import { Base } from "./base";

export class Auth extends Base {
  async login(username: string, password: string): Promise<string> {
    try {
      const response = await this.request<{ Data: { AccessToken: string } }>('/users/login-password', {
        method: 'POST',
        body: JSON.stringify({ UserName: username,Password:password }),
      });

      if (!response || !response.Data.AccessToken) {
        throw new Error('Failed to retrieve token');
      }

      return response.Data.AccessToken;
    } catch (error: any) {
      console.error("Login failed:", error.message);
      throw error;
    }
  }
}
import { Base } from "./base";
export type uuid = string | undefined | null;

type User = {
  id?: uuid;
  RoleId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Gender: string;
  CountryCode: string;
  Phone:string;
  Password:string;
};

type UserSearchFilters = {
  firstName?: string;
  lastName? : string;
  phone?    : string;
  email?    : string;
}

export class Users extends Base {

  async create(user: User): Promise<{ user: User }> {
      const response = await this.request<{ Data: User }>(`/users/`, {
        method: 'POST',
        body: JSON.stringify(user),
      },false);
      return { user: response.Data };
  }
  
  async getById(userId: uuid): Promise<User> {
    return this.request<User>(`/users/${userId}`,undefined,true);
  }

  async search(filters: UserSearchFilters = {}): Promise<User[]> {
    const query = new URLSearchParams(filters as Record<string, string>).toString();
    return this.request<User[]>(`/users/search?${query}`,undefined,true);
  }

  // Update a user by ID
  async update(userId: uuid, user: User): Promise<User> {
    return this.request<User>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    },true);
  }

  // Delete a user by ID
  async delete(userId: uuid): Promise<void> {
    return this.request<void>(`/users/${userId}`, {
      method: 'DELETE',
    },true);
  }
}

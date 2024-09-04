import { Auth } from './api/auth';
import { Users } from './api/users';

export class Library {
  users: Users;
  private auth: Auth;
  private authToken: string | null = null;

  constructor(config: { apiKey?: string}) {
    this.auth = new Auth(config);
    this.users = new Users(config);
  }

  async authenticateUser(username: string, password: string): Promise<void> {
    try {
      const token = await this.auth.login(username, password);
      this.authToken = token;
      
      // Set the auth token for all services
      this.users.setAuthToken(token);
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
  
}

// import { Auth } from './api/auth';
// import { Users } from './api/users';

// export class Library {
//   users: Users;
//   private auth: Auth;
//   private authToken: string | null = null;
//   private username?: string;
//   private password?: string;

//   constructor(config: { baseUrl: string; apiKey?: string }, username?: string, password?: string) {
//     this.auth = new Auth({ baseUrl: config.baseUrl, apiKey: config.apiKey });
//     this.users = new Users({ baseUrl: config.baseUrl, apiKey: config.apiKey });

//     // Store credentials for re-authentication
//     this.username = username;
//     this.password = password;

//     if (username && password) {
//       this.initialize().catch((error) => {
//         console.error('Failed to authenticate during initialization:', error);
//         throw error;
//       });
//     }
//   }

//   private async initialize(): Promise<void> {
//     if (!this.username || !this.password) {
//       throw new Error('Username or password not provided');
//     }
//     try {
//       const token = await this.auth.login(this.username, this.password);
//       this.authToken = token;
//       this.users.setAuthToken(token);
//     } catch (error) {
//       console.error('Failed to authenticate:', error);
//       throw error;
//     }
//   }

//   private async ensureAuthenticated(): Promise<void> {
//     if (!this.authToken) {
//       await this.initialize(); // Use stored credentials
//     }
//   }

//   // Example method that requires authentication
//   public async performUserAction(): Promise<void> {
//     await this.ensureAuthenticated();
//   }
// }

// export class Library {
//   users: Users;
//   private auth: Auth;
//   private authToken: string | null = null;

//   constructor(config: { baseUrl: string; apiKey?: string }, username?: string, password?: string) {
//     this.auth = new Auth({ baseUrl: config.baseUrl, apiKey: config.apiKey });
//     this.users = new Users({ baseUrl: config.baseUrl, apiKey: config.apiKey });

//     if (username && password) {
//       this.initialize(username, password).catch(error => {
//         console.error('Failed to authenticate during initialization:', error);
//         throw error;
//       });
//     }
//   }

//   private async initialize(username: string, password: string): Promise<void> {
//     try {
//       const token = await this.auth.login(username, password);
//       this.authToken = token;
//       this.users.setAuthToken(token);
//     } catch (error) {
//       console.error('Failed to authenticate:', error);
//       throw error;
//     }
//   }

//   private async ensureAuthenticated(username: string, password: string): Promise<void> {
//     if (!this.authToken) {
//       await this.initialize(username, password);
//     }

//   }

//   // async login(username: string, password: string): Promise<void> {
//   //   const token = await this.auth.login(username, password);
//   //   this.authToken = token;
//   //   this.users.setAuthToken(token);
//   // }

// }



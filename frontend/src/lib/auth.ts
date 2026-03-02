import { apiClient } from "@/lib/api/client";

class SimpleAuthClient {
  private token: string | null = null;
  private user: any = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
  }

  async signInEmail({ email, password }: { email: string; password: string }) {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { user, token } = response.data.data;
      
      this.token = token;
      this.user = user;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
      }
      
      return { data: { user }, error: null };
    } catch (error: any) {
      const message = error?.response?.data?.message || "Sign in failed";
      throw new Error(message);
    }
  }

  async signUpEmail({ email, password, name }: { email: string; password: string; name?: string }) {
    try {
      const response = await apiClient.post("/auth/register", { email, password, name });
      const { user, token } = response.data.data;
      
      this.token = token;
      this.user = user;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
      }
      
      return { data: { user }, error: null };
    } catch (error: any) {
      const message = error?.response?.data?.message || "Sign up failed";
      throw new Error(message);
    }
  }

  async signOut() {
    this.token = null;
    this.user = null;
    
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }

  async getSession() {
    if (!this.token) {
      return { data: { session: null }, error: null };
    }

    try {
      const response = await apiClient.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      
      this.user = response.data.data.user;
      return { data: { session: { user: this.user } }, error: null };
    } catch (error) {
      this.token = null;
      this.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
      }
      return { data: { session: null }, error: null };
    }
  }

  useSession() {
    throw new Error("useSession should be imported from @/lib/auth-react");
  }
}

export const authClient = new SimpleAuthClient();

export const signIn = {
  email: authClient.signInEmail.bind(authClient)
};
export const signUp = {
  email: authClient.signUpEmail.bind(authClient)
};
export const signOut = authClient.signOut.bind(authClient);

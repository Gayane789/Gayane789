import { Storage } from "../utils/storage.js";

export class AuthApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async register(user) {
    try { 
      
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
         
      });

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error in register method:", error);
      throw error;
    }
  }

  async login(credentials) {
    try {
      if (!credentials.email || !credentials.password) {
        throw new Error("Please fill in all fields");
      }

      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.token) {
        Storage.setItem("token", data.token);  
        Storage.setItem("user", data.user);  
      }

      return data;
    } catch (error) {
      console.error("Error in login method:", error);
      throw error;
    }
  }
};
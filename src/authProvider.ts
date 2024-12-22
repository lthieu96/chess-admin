import type { AuthProvider } from "@refinedev/core";
import { axiosInstance } from "@refinedev/nestjsx-crud";
import { AxiosError } from "axios";

export const TOKEN_KEY = "refine-auth";

axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        emailOrUsername: username || email,
        password,
      });

      localStorage.setItem(TOKEN_KEY, data.access_token);

      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return {
          success: false,
          error: {
            name: "Login failed",
            message: error.response.data.message,
          },
        };
      } else {
        return {
          success: false,
          error: {
            name: "Login failed",
            message: "Something went wrong",
          },
        };
      }
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    axiosInstance.defaults.headers.common["Authorization"] = "";
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    try {
      const { data } = await axiosInstance.get("/auth/profile");
      return {
        authenticated: true,
      };
    } catch (error) {
      return {
        authenticated: false,
        error: {
          name: "Check failed",
          message: "You are not authenticated",
        },
        redirectTo: "/login",
      };
    }
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    try {
      const { data } = await axiosInstance.get("/auth/profile");
      return {
        id: data.id,
        name: data.username,
        avatar: "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg",
      };
    } catch (error) {
      return null;
    }
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};

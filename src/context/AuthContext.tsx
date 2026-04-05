import { createContext } from "react";

export type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (nextToken: string) => void;
  logout: () => void;
};

// Context ini menyimpan state autentikasi agar bisa dipakai di seluruh page.
export const AuthContext = createContext<AuthContextType | null>(null);

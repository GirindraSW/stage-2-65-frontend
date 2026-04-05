import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";

const AUTH_TOKEN_KEY = "auth_token";

// mengambil token awal dari localStorage saat app pertama kali dirender.
function getInitialToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// semua child bisa mengakses login/logout state.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(getInitialToken);

  // Fungsi login menyimpan token ke state dan localStorage agar sesi tetap tersimpan.
  const login = (nextToken: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
    setToken(nextToken);
  };

  // Fungsi logout menghapus token dari state dan localStorage.
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
  };

  // Memo dipakai supaya object value context stabil selama dependensi tidak berubah.
  const authValue = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

// autentikasi sederhana dan menyimpan token ke context/localStorage.
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // memvalidasi username/password lalu menyimpan token jika valid.
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === "admin" && password === "admin") {
      login("token_admin_demo");
      navigate("/dashboard");
      return;
    }

    setErrorMessage("Username atau password salah. Gunakan admin/admin.");
  };

  return (
    <section className="mx-auto w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Login</h2>
      <p className="mt-1 text-sm text-muted-foreground">Masuk dulu untuk lanjut.</p>

      <form className="mt-5 space-y-4" onSubmit={handleLogin}>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="admin"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="admin"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="text-sm font-medium text-destructive">{errorMessage}</p>}

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </section>
  );
}

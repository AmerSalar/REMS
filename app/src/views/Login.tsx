import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import type { LoginCredentials } from "../types/auth";

export default function LoginView() {
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await login(formData);
      console.log("Login successful! user", user);

      switch (user.role) {
        case "admin":
          navigate("/admin", { replace: true });
          break;
        case "manager":
          navigate("/manager", { replace: true });
          break;
        case "employee":
          navigate("/", { replace: true });
          break;
      }
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-6 md:px-30 flex justify-center items-center min-h-[80vh]">
      <div className="card max-w-md w-full">
        {/* Title & Subtitle */}
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-slate-500 mb-6">
          Sign in to your account to continue
        </p>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-200 rounded-xl p-3 mb-4">
            <p className="text-sm text-red-600 font-bold">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Email address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              className="border border-orange-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none w-full"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="border border-orange-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-950 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors w-full disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

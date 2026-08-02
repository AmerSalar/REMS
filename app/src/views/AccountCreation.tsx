import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import type { RegisterCredentials } from "../types/auth"; // Make sure to define this type in your types file

export default function AccountCreationView() {
  const register = useAuthStore((state) => state.register);

  const [formData, setFormData] = useState<RegisterCredentials>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "employee", // Default selection
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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

    // Client-side password match check
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const user = await register(formData);
      console.log("Account created successfully! user", user);

      // Redirect based on the newly created/assigned role
      switch (user.role) {
        case "admin":
          navigate("/admin", { replace: true });
          break;
        case "manager":
          navigate("/manager", { replace: true });
          break;
        case "employee":
        default:
          navigate("/", { replace: true });
          break;
      }
    } catch (err: any) {
      if (err.response?.status === 422) {
        // 🔍 THIS WILL LOG THE EXACT FAILING FIELDS
        console.log("Laravel Validation Errors:", err.response.data.errors);

        // Display the first validation error message to the user
        const errors = err.response.data.errors;
        const firstKey = Object.keys(errors)[0];
        setError(errors[firstKey][0]);
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-6 md:px-30 flex justify-center items-center min-h-[80vh]">
      <div className="card max-w-md w-full">
        {/* Title & Subtitle */}
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-sm text-slate-500 mb-6">
          Enter your details below to set up a new account
        </p>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-200 rounded-xl p-3 mb-4">
            <p className="text-sm text-red-600 font-bold">{error}</p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="border border-orange-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none w-full"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Email address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="john@example.com"
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

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              required
              placeholder="••••••••"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="border border-orange-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none w-full"
            />
          </div>

          {/* Role Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-orange-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none w-full"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-950 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors w-full disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

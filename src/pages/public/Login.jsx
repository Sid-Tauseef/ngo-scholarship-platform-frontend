import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { login as loginAction } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    setLoading(true);
    setError(null);
    dispatch(loginAction(data))
      .unwrap()
      .then((payload) => {
        const userRole = payload.user?.role;
        if (userRole === "STUDENT") {
          navigate("/student/dashboard/schemes");
        } else if (userRole === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (userRole === "INSTITUTE" || userRole === "MEMBER") {
          navigate(`/${userRole.toLowerCase()}/dashboard`);
        } else {
          setError("Invalid user role. Please contact support.");
        }
      })
      .catch((err) => {
        setError(err.message || "Login failed. Please check your credentials and try again.");
        console.error("Login failed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-600 mt-2">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-emerald-200"
              }`}
              placeholder="you@example.com"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-emerald-200"
              }`}
              placeholder="••••••••"
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="text-center text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium text-white transition ${
              loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          <span>New user? </span>
          <Link
            to="/register"
            className="text-emerald-600 hover:text-emerald-800 font-medium"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

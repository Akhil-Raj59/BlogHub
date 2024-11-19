import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login({ userData: currentUser }));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "Sign-up failed.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Signup Form Container */}
      <div className="relative z-10 max-w-md w-full bg-black bg-opacity-80 rounded-lg shadow-lg p-8 border border-pink-700">
        <div className="flex justify-center mb-6">
          <Logo className="max-w-[120px]" />
        </div>

        <h2 className="text-center text-3xl font-bold text-pink-500">Create Account</h2>
        <p className="mt-2 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 font-medium hover:text-pink-300">
            Log In
          </Link>
        </p>

        {error && (
          <p className="mt-4 text-center text-red-500" aria-live="assertive">
            {error}
          </p>
        )}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500"
            {...register("name", { required: "Full name is required." })}
            error={errors.name}
          />

          {/* Email */}
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address.",
              },
            })}
            error={errors.email}
          />

          {/* Password */}
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500"
            {...register("password", { required: "Password is required." })}
            error={errors.password}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-pink-600 text-black font-semibold rounded-lg shadow-md hover:bg-pink-500 hover:scale-105 transition-all duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

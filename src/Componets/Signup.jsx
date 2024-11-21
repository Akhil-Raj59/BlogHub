import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";

const Signup = () => {
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

  // Generate chess board grid
  const generateGrid = () => {
    const grid = [];
    const rows = 8; // 8x8 chess board
    const cols = 8;

    for (let i = 0; i < rows * cols; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const isEven = (row + col) % 2 === 0;

      grid.push({
        key: i,
        isEven,
        style: {
          top: `${(row / rows) * 100}%`,
          left: `${(col / cols) * 100}%`,
          width: `${100 / cols}%`,
          height: `${100 / rows}%`,
        }
      });
    }
    return grid;
  };

  return (
    <div className="relative p-0 m-0 min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Chess grid container */}
      <div className="absolute inset-0">
        {generateGrid().map(({ key, isEven, style }) => (
          <div
            key={key}
            style={style}
            className={`absolute transition-all duration-300 
                        ${isEven ? 'bg-pink-700' : 'bg-black'}
                        hover:scale-[2] hover:rotate-45 hover:rounded-xl
                        hover:z-10 backdrop-blur-sm
                        group cursor-pointer`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 bg-gradient-to-br from-purple-400/20 
                        to-transparent rounded-xl" />
          </div>
        ))}
      </div>

      {/* Signup Form */}
      <div className="relative z-10 max-w-md w-full bg-black bg-opacity-80 rounded-lg shadow-lg p-8 border border-pink-700">
        <div className="flex justify-center mb-4">
          <Logo className="max-w-[80%]" />
        </div>

        <h2 className="text-center text-3xl font-bold text-pink-500">
          Create Account
        </h2>
        <p className="mt-2 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 font-medium hover:text-pink-300">
            Log In
          </Link>
        </p>

        {error && (
          <p className="mt-4 text-center text-red-400" aria-live="assertive">
            {error}
          </p>
        )}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500"
              {...register("name", { required: "Full name is required." })}
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
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
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500"
              {...register("password", { required: "Password is required." })}
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

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
};

export default Signup;

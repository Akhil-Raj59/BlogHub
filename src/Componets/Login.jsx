import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../Store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    await new Promise(resolve => {
                        dispatch(authLogin({ userData }));
                        setTimeout(resolve, 100);
                    });
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // Generate chess board grid
    const generateGrid = () => {
        const grid = [];
        const rows = 8;  // 8x8 chess board
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
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            
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
                        {/* Inner glow effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300 bg-gradient-to-br from-purple-400/20 
                            to-transparent rounded-xl" />
                    </div>
                ))}
            </div>

            {/* Login form */}
            <div className="relative z-10 max-w-md w-full bg-black bg-opacity-80 rounded-lg shadow-lg p-8 border border-pink-700">
                <div className="flex justify-center mb-4">
                    <Logo className="max-w-[80%]" />
                </div>

                <h1 className="text-center text-3xl font-bold text-pink-500">Sign in to your account</h1>
                <p className="mt-2 text-center text-gray-400">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-pink-500 font-medium hover:text-pink-300">
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="mt-4 text-center text-red-400" aria-live="assertive">
                        {error}
                    </p>
                )}

                <form className="mt-6 space-y-6" onSubmit={handleSubmit(login)}>
                    <div>
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be valid"
                                }
                            })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-400 mt-1" role="alert">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Password:"
                            placeholder="Enter your password"
                            type="password"
                            className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500"
                            {...register("password", { required: "Password is required" })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-600 mt-1" role="alert">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-3 bg-pink-600 text-black font-semibold rounded-lg shadow-md hover:bg-pink-500 hover:scale-105 transition-all duration-200"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
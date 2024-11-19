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
        const rows = 8;
        const cols = 8;

        for (let i = 0; i < rows * cols; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const isEven = (row + col) % 2 === 0;
            const animationDelay = `${(row + col) * 0.1}s`;

            grid.push({
                key: i,
                isEven,
                style: {
                    top: `${(row / rows) * 100}%`,
                    left: `${(col / cols) * 100}%`,
                    width: `${100 / cols}%`,
                    height: `${100 / rows}%`,
                    animationDelay
                }
            });
        }
        return grid;
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513] via-[#D2691E] to-[#8B4513] animate-gradient" />
            
            {/* Chess grid container */}
            <div className="absolute inset-0">
                {generateGrid().map(({ key, isEven, style }) => (
                    <div
                        key={key}
                        style={style}
                        className={`absolute transition-all duration-300 animate-shine
                            ${isEven ? 'bg-[#DEB887]/40' : 'bg-[#8B4513]/40'}
                            hover:bg-[#CD853F]/80 hover:scale-[2] hover:rotate-45 hover:rounded-xl
                            hover:z-10 backdrop-blur-sm
                            before:absolute before:inset-0 before:bg-shine before:animate-shine-move
                            group cursor-pointer overflow-hidden`}
                    >
                        {/* Inner glow effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300 bg-gradient-to-br from-[#FFE4B5]/30 
                            to-transparent rounded-xl" />
                    </div>
                ))}
            </div>

            {/* Login form */}
            <div className="w-full max-w-md bg-[#FFEFD5]/10 backdrop-blur-md rounded-xl p-8 shadow-2xl relative z-20 border border-[#DEB887]/30">
                <div className="flex justify-center mb-4">
                    <Logo className="max-w-[80%]" />
                </div>

                <h2 className="text-center text-2xl font-bold text-[#8B4513]">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-[#A0522D]">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-[#8B4513] font-medium hover:text-[#A0522D]">
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="mt-4 text-center text-red-700" aria-live="assertive">
                        {error}
                    </p>
                )}

                <form className="mt-6 space-y-6" onSubmit={handleSubmit(login)}>
                    <div>
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-white/20 border-[#DEB887]/50 text-[#8B4513] placeholder:text-[#A0522D]/70"
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
                            <p className="text-xs text-red-700 mt-1" role="alert">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Password:"
                            placeholder="Enter your password"
                            type="password"
                            className="bg-white/20 border-[#DEB887]/50 text-[#8B4513] placeholder:text-[#A0522D]/70"
                            {...register("password", { required: "Password is required" })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-700 mt-1" role="alert">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-2 bg-[#8B4513] text-[#FFEFD5] rounded-lg hover:bg-[#A0522D] 
                            transition-all duration-200 shadow-lg hover:shadow-[#DEB887]/25 
                            hover:scale-[1.02]"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
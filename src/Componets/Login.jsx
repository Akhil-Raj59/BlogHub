import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../Store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login(props) {
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
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4">
            <div className="w-full max-w-md bg-gray-100 rounded-xl p-8 shadow-md border border-gray-200">
                <div className="flex justify-center mb-4">
                    <Logo className="max-w-[80%]" />
                </div>

                <h2 className="text-center text-2xl font-bold">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-primary font-medium hover:underline">
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="mt-4 text-center text-red-600" aria-live="assertive">
                        {error}
                    </p>
                )}

                <form className="mt-6 space-y-6" onSubmit={handleSubmit(login)}>
                    <div>
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
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
                            <p className="text-xs text-red-500 mt-1" role="alert">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Password:"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1" role="alert">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;

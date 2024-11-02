import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Store/authSlice';
import { Button, Input, Logo } from "./index";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

function Signup(props) {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    // Dispatch first and wait for it to complete
                    await new Promise(resolve => {
                        dispatch(login({userData: currentUser}));
                        // Give Redux a small amount of time to update
                        setTimeout(resolve, 100);
                    });
                    // Then navigate
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="mx-auto w-full max-w-lg bg-white rounded-xl shadow-lg p-10 border border-gray-200">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-gray-800">Sign up to create an account</h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-6">
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("name", { required: "Full name is required." })}
                            error={errors.name}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address",
                                }
                            })}
                            error={errors.email}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required." })}
                            error={errors.password}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;

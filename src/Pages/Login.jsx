import React from 'react';
import { Login as LoginComponent } from "../Componets"; // Ensure proper import casing

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-900 py-8 px-4">
            <div className="w-full max-w-md bg-dark-700 p-6 rounded-lg shadow-dark-glow">
                <h1 className="text-3xl font-bold text-center text-brand-200 mb-6">Login</h1>
                <LoginComponent /> {/* Use PascalCase for component names */}
            </div>
        </div>
    );
};

export default Login;

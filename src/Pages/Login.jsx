import React from 'react';
import { Login as LoginComponent } from "../Componets"; // Ensure proper import casing

const Login = () => {
    return (
        <div className='py-8'>
            <LoginComponent /> {/* Use PascalCase for component names */}
        </div>
    );
}

export default Login;

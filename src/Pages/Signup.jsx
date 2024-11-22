import React from 'react';
import { Signup as SignupComponent } from '../Componets'; // Ensure proper import casing

const Signup = () => {
    return (
        <div className=" bg-gray-100 min-h-screen flex justify-center items-center">
            <SignupComponent /> {/* Use PascalCase for component names */}
        </div>
    );
}

export default Signup;

import React from 'react';
import { Signup as SignupComponent } from '../Componets'; // Ensure proper import casing

const Signup = () => {
    return (
        <div className='py-8'>
            <SignupComponent /> {/* Use PascalCase for component names */}
        </div>
    );
}

export default Signup;

import React from 'react';
import logo from '../assets/logo.png'; // Adjust the path if needed

function Logo({ width = '60px' }) {
    return (
        <div className="flex items-center">
            <img
                src={logo}
                alt="Logo"
                style={{ width }}
                className="transition-transform duration-300 transform hover:scale-110"
            />
        </div>
    );
}

export default Logo;

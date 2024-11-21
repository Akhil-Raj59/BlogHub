import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    return loader ? (
        <div className="flex justify-center items-center h-screen bg-gray-800">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-t-4 border-pink-600 border-solid rounded-full animate-spin"></div>
                <p className="absolute text-white text-lg top-24 left-1/2 transform -translate-x-1/2">Loading...</p>
            </div>
        </div>
    ) : (
        <>{children}</>
    );
}

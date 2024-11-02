import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../Store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const logoutHandler = async () => {
        try {
            setIsLoading(true);
            await authService.logout();
            dispatch(logout());
        } catch (error) {
            console.error('Logout error:', error);
            // Optionally display error feedback here
        } finally {
            setIsLoading(false);
        }
    };

    const Spinner = () => (
        <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
        >
            <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
            />
            <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );

    return (
        <button
            onClick={logoutHandler}
            disabled={isLoading}
            aria-live="polite"
            className={`
                inline-flex items-center justify-center
                px-4 py-2
                font-medium text-sm
                rounded-lg
                transition-all duration-200
                ${isLoading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200'
                }
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            `}
        >
            {isLoading ? (
                <>
                    <Spinner />
                    Logging out...
                </>
            ) : (
                'Logout'
            )}
        </button>
    );
}

export default LogoutBtn;

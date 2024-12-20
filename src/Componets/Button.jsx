import React from 'react';

function Button({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    bgColor,
    textColor,
    className = '',
    isLoading = false,
    disabled = false,
    leftIcon = null,
    rightIcon = null,
    ...props
}) {
    const variants = {
        primary: 'bg-pink-600 hover:bg-pink-500 text-black',
        secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-300',
        danger: 'bg-red-600 hover:bg-red-500 text-white',
        outline: 'border-2 border-pink-600 text-pink-600 hover:bg-pink-600/10',
        ghost: 'text-pink-500 hover:bg-pink-600/10'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    const disabledStyles = disabled || isLoading
        ? 'opacity-50 cursor-not-allowed'
        : 'transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]';

    const customColors = bgColor 
        ? `${bgColor} ${textColor || 'text-white'}`
        : variants[variant];
    
    const focusRingColor = variant === 'danger'
        ? 'focus:ring-red-500'
        : variant === 'primary'
        ? 'focus:ring-pink-500'
        : 'focus:ring-gray-500';

    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            className={`
                ${customColors}
                ${sizes[size]}
                ${disabledStyles}
                inline-flex items-center justify-center
                font-medium rounded-lg
                ${focusRingColor} 
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2
                focus:ring-opacity-50
                shadow-md
                hover:shadow-dark-glow
                active:shadow-none
                ${className}
            `}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center">
                    <svg
                        className={`
                            animate-spin 
                            -ml-1 
                            mr-2 
                            h-4 
                            w-4 
                            ${textColor || 'text-white'}
                        `}
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
                    Loading...
                </div>
            ) : (
                <span className="inline-flex items-center">
                    {leftIcon && <span className="mr-2">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="ml-2">{rightIcon}</span>}
                </span>
            )}
        </button>
    );
}

export default React.memo(Button);
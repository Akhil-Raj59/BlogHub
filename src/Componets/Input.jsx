import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    size = "md",
    error = "",
    helperText = "",
    leftIcon = null,
    rightIcon = null,
    disabled = false,
    required = false,
    theme = "default", // New prop for theme
    ...props
}, ref) {
    const id = useId();

    const sizeClasses = {
        sm: 'px-2 py-1 text-sm',
        md: 'px-3 py-2',
        lg: 'px-4 py-3 text-lg'
    };

    const baseInputClasses = `
        w-full
        rounded-lg
        border
        bg-white
        text-gray-900
        placeholder:text-gray-400
        focus:outline-none
        focus:ring-2
        transition-colors
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-50
    `;

    const stateClasses = error
        ? 'border-red-300 focus:border-red-300 focus:ring-red-200'
        : 'border-gray-200 focus:border-blue-300 focus:ring-blue-200 hover:border-gray-300';

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className={`inline-block mb-1.5 text-sm font-medium text-gray-700 ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}`}
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{leftIcon}</span>}
                
                <input
                    type={type}
                    className={`${baseInputClasses} ${sizeClasses[size]} ${stateClasses} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`}
                    id={id}
                    ref={ref}
                    disabled={disabled}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
                    required={required}
                    {...props}
                />

                {rightIcon && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</span>}
            </div>

            {error && <p className="mt-1.5 text-sm text-red-500" id={`${id}-error`}>{error}</p>}
            {!error && helperText && <p className="mt-1.5 text-sm text-gray-500" id={`${id}-helper`}>{helperText}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;

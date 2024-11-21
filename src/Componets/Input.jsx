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
        bg-gray-900
        text-gray-300
        placeholder-gray-500
        focus:outline-none
        focus:ring-2
        transition-all
        duration-300
        disabled:cursor-not-allowed
        disabled:opacity-50
    `;

    const stateClasses = error
        ? 'border-red-500 focus:border-red-500 focus:ring-red-300'
        : 'border-gray-700 focus:border-pink-500 focus:ring-pink-300 hover:border-gray-600';

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className={`
                        inline-block 
                        mb-1.5 
                        text-sm 
                        font-medium 
                        text-gray-400 
                        ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
                    `}
                >
                    {label}
                </label>
            )}

            <div className="relative group">
                {leftIcon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-500">
                        {leftIcon}
                    </span>
                )}
                
                <input
                    type={type}
                    className={`
                        ${baseInputClasses} 
                        ${sizeClasses[size]} 
                        ${stateClasses} 
                        ${leftIcon ? 'pl-10' : ''} 
                        ${rightIcon ? 'pr-10' : ''} 
                        ${className}
                        hover:shadow-dark-glow
                        focus:shadow-dark-intense
                    `}
                    id={id}
                    ref={ref}
                    disabled={disabled}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
                    required={required}
                    {...props}
                />

                {rightIcon && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-500">
                        {rightIcon}
                    </span>
                )}
            </div>

            {error && (
                <p 
                    className="
                        mt-1.5 
                        text-sm 
                        text-red-500 
                        animate-pulse
                    " 
                    id={`${id}-error`}
                >
                    {error}
                </p>
            )}
            
            {!error && helperText && (
                <p 
                    className="
                        mt-1.5 
                        text-sm 
                        text-gray-500
                    " 
                    id={`${id}-helper`}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
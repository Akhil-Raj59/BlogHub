import React from 'react';
import { useId } from 'react';

const Select = React.forwardRef(
    ({ options, label, className = "", error, disabled, ...props }, ref) => {
        const id = useId();

        return (
            <div className={`w-full ${className}`}>
                {label && (
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}

                <select
                    {...props}
                    ref={ref}
                    id={id}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className={`px-3 py-2 rounded-lg w-full bg-white border 
                        ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500'}
                        ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'text-black'}
                        outline-none focus:bg-gray-50 transition duration-200`}
                >
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                {error && (
                    <p id={`${id}-error`} className="mt-1 text-xs text-red-500">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

export default Select;

import React from 'react';

function Container({
    children,
    size = 'default',
    padding = true,
    className = '',
    fluid = false,
    as: Component = 'div',
    theme = 'default', // Added theme prop to control container theme
}) {
    const sizes = {
        sm: 'max-w-4xl',
        default: 'max-w-7xl',
        lg: 'max-w-8xl',
        fluid: 'max-w-full',
    };

    const paddingClasses = {
        x: padding ? 'px-4 sm:px-6 lg:px-8' : '',
        y: padding ? 'py-4 sm:py-6 lg:py-8' : '',
    };

    const themeClasses = {
        default: 'bg-gray-900 text-white', // Default dark theme
        pink: 'bg-pink-900 text-pink-100', // Dark pink background with lighter text
        orangishDark: 'bg-orange-800 text-white', // Orangish dark theme
    };

    return (
        <Component
            className={`w-full mx-auto ${fluid ? sizes.fluid : sizes[size]} ${paddingClasses.x} ${paddingClasses.y} ${themeClasses[theme]} ${className}`}
        >
            {children}
        </Component>
    );
}

export default Container;

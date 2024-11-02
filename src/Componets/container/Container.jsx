import React from 'react';

function Container({
    children,
    size = 'default',
    padding = true,
    className = '',
    fluid = false,
    as: Component = 'div'
}) {
    const sizes = {
        sm: 'max-w-4xl',
        default: 'max-w-7xl',
        lg: 'max-w-8xl',
        fluid: 'max-w-full'
    };

    const paddingClasses = {
        x: padding ? 'px-4 sm:px-6 lg:px-8' : '',
        y: padding ? 'py-4 sm:py-6 lg:py-8' : ''
    };

    return (
        <Component
            className={`
                w-full
                mx-auto
                ${fluid ? sizes.fluid : sizes[size]}
                ${paddingClasses.x}
                ${className}
            `}
        >
            {children}
        </Component>
    );
}

export default Container;
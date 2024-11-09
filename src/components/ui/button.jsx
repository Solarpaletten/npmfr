import React from 'react';

export const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

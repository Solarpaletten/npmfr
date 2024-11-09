import React from 'react';

export const Alert = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border p-4 ${className}`} {...props}>
    {children}
  </div>
));

export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`text-sm ${className}`} {...props} />
));

Alert.displayName = "Alert";
AlertDescription.displayName = "AlertDescription";

// Example component structure for hazo_ui library
// This is a placeholder - replace with your actual components
import React from "react";

/**
 * Example component demonstrating the structure for hazo_ui components
 * @param props - Component props
 * @returns React component
 */
export const ExampleComponent: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div className={`cls_example_component ${className}`}>
      {children}
    </div>
  );
};


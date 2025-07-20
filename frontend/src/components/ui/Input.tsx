"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxWidth?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  maxWidth = "max-w-xs",
  ...props
}) => {
  return (
    <div className={`w-full ${maxWidth}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`input input-bordered  w-full bg-transparent  ${
          error ? "border-red-500" : ""
        } ${className}`}
      />
      {helperText && <p className="mt-1 text-xs text-blue-600">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;

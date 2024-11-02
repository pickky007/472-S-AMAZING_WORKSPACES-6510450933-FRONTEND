import React from 'react';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
                         label,
                         variant = 'primary',
                         onClick,
                         disabled = false,
                         type = 'button'
                       }: ButtonProps) {
  return (
      <button
          type={type}
          className={`px-4 py-2 rounded border-none cursor-pointer text-sm font-medium transition-all duration-200 ease-in-out ${
              variant === 'primary'
                  ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
          onClick={onClick}
          disabled={disabled}
      >
        {label}
      </button>
  );
}

import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button ({
  label,
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button'
}: ButtonProps)  {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};


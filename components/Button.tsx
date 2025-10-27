'use client';

import { ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
}

const baseClasses =
  'inline-flex items-center justify-center rounded-md px-lg py-sm text-body font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-cash-app-green text-white hover:opacity-90 focus:ring-cash-app-green focus:ring-offset-light-bg',
  secondary:
    'bg-white border-2 border-cash-app-green text-cash-app-green hover:bg-cash-app-green/10 focus:ring-cash-app-green focus:ring-offset-light-bg',
};

const disabledClasses: Record<ButtonVariant, string> = {
  primary: 'bg-gray-300 text-gray-500 border-transparent',
  secondary: 'bg-gray-200 text-gray-500 border-gray-200',
};

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled,
  loading,
  type = 'button',
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const variantClass = disabled
    ? disabledClasses[variant]
    : variantClasses[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClass} ${
        isDisabled ? 'cursor-not-allowed' : ''
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-xs">
          <LoadingSpinner size={16} />
          <span>Loading</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-xl cursor-pointer select-none tracking-tight';

  const variantStyles = {
    primary: 'bg-[#EF7D01] hover:bg-[#D66D00] text-white shadow-sm hover:shadow-md hover:shadow-orange-500/20 border border-transparent active:scale-[0.98]',
    secondary: 'bg-[#0A0F1D] hover:bg-[#1E293B] text-white shadow-sm hover:shadow border border-transparent active:scale-[0.98]',
    outline: 'bg-white hover:bg-orange-50/60 text-[#EF7D01] border border-[#EF7D01]/40 hover:border-[#EF7D01] shadow-xs active:scale-[0.98]',
    'outline-light': 'bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white shadow-xs backdrop-blur-xs active:scale-[0.98]',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-950 active:scale-[0.98]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm px-5 py-2.5 gap-2 rounded-xl',
    lg: 'text-base px-7 py-3.5 gap-2.5 rounded-xl font-bold',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'amber' | 'blue' | 'green' | 'red' | 'slate' | 'cyan';
  size?: 'xs' | 'sm' | 'md';
  pulse?: boolean;
  mono?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'amber',
  size = 'sm',
  pulse = false,
  mono = true,
  className = '',
}) => {
  const variantStyles = {
    amber: 'bg-orange-50 text-[#EF7D01] border-orange-200/90 font-semibold',
    blue: 'bg-sky-50 text-sky-700 border-sky-200/90 font-semibold',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200/90 font-semibold',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200/90 font-semibold',
    red: 'bg-rose-50 text-rose-700 border-rose-200/90 font-semibold',
    slate: 'bg-slate-100 text-slate-700 border-slate-200 font-semibold',
  };

  const dotColors = {
    amber: 'bg-[#EF7D01]',
    blue: 'bg-sky-600',
    cyan: 'bg-cyan-600',
    green: 'bg-emerald-600',
    red: 'bg-rose-600',
    slate: 'bg-slate-500',
  };

  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 tracking-wider',
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wider',
    md: 'text-xs px-3 py-1 tracking-wide',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full ${
        mono ? 'font-mono' : ''
      } ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColors[variant]}`} />
        </span>
      )}
      {children}
    </span>
  );
};

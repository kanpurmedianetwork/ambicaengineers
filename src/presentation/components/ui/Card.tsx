import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: 'amber' | 'cyan' | 'none';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-all duration-300 ${
        hoverEffect ? 'hover:border-[#EF7D01]/40 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] hover:-translate-y-0.5' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

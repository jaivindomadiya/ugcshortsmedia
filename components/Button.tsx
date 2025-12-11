import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    // Primary: Yellow bg, Black Text. Hover: Darker yellow, slightly higher shadow.
    primary: "bg-primary text-[#111111] hover:bg-primary-hover shadow-[0_4px_0_0_#DDAA00] hover:shadow-[0_6px_0_0_#DDAA00] hover:-translate-y-0.5 border-2 border-transparent",
    
    // Secondary: Black bg, White Text. Hover: Yellow bg, Black text (Human touch interaction)
    secondary: "bg-[#111111] text-white hover:bg-primary hover:text-[#111111] border-2 border-[#111111] hover:border-primary shadow-lg",
    
    // Outline: Black border. Hover: Black bg, White text.
    outline: "bg-transparent border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
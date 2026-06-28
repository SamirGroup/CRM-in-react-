import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--naf-accent)] text-white hover:bg-[var(--naf-accent-hover)] focus-visible:ring-[var(--naf-accent)]',
        default: 'bg-[var(--naf-raised-bg)] text-[var(--naf-body-fg)] border border-[var(--naf-border-subtle)] hover:bg-[var(--naf-chrome-bg)] focus-visible:ring-[var(--naf-accent)]',
        ghost: 'text-[var(--naf-body-fg)] hover:bg-[var(--naf-chrome-bg)] focus-visible:ring-[var(--naf-accent)]',
        outline: 'border border-[var(--naf-border-subtle)] text-[var(--naf-body-fg)] hover:bg-[var(--naf-chrome-bg)] focus-visible:ring-[var(--naf-accent)]',
        danger: 'bg-[var(--naf-danger)] text-white hover:bg-[var(--naf-danger-hover)] focus-visible:ring-[var(--naf-danger)]',
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-12 px-6 text-base rounded-xl',
        icon: 'h-10 w-10 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

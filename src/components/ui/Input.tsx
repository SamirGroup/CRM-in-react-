import { cn } from '@/lib/cn';
import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-lg border border-[var(--naf-border-subtle)] bg-[var(--naf-raised-bg)] px-3 py-2 text-sm text-[var(--naf-body-fg)]',
            'placeholder:text-[var(--naf-body-fg-faint)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--naf-accent)] focus-visible:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors',
            error && 'border-[var(--naf-danger-border)] focus-visible:ring-[var(--naf-danger)]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[var(--naf-danger)]">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };

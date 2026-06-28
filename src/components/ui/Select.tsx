import { cn } from '@/lib/cn';
import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, error, ...props }, ref) => {
    return (
      <div className="w-full relative">
        <select
          ref={ref}
          className={cn(
            'appearance-none flex h-10 w-full rounded-lg border border-[var(--naf-border-subtle)] bg-[var(--naf-raised-bg)] px-3 py-2 pr-10 text-sm text-[var(--naf-body-fg)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--naf-accent)] focus-visible:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors',
            error && 'border-[var(--naf-danger-border)] focus-visible:ring-[var(--naf-danger)]',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--naf-body-fg-muted)] pointer-events-none" />
        {error && (
          <p className="mt-1 text-sm text-[var(--naf-danger)]">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };

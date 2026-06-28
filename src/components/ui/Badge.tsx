import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import { forwardRef, type HTMLAttributes } from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        neutral: 'bg-[var(--naf-badge-neutral-bg)] text-[var(--naf-badge-neutral-fg)] border border-[var(--naf-badge-neutral-border)]',
        info: 'bg-[var(--naf-badge-info-bg)] text-[var(--naf-badge-info-fg)] border border-[var(--naf-badge-info-border)]',
        success: 'bg-[var(--naf-badge-success-bg)] text-[var(--naf-badge-success-fg)] border border-[var(--naf-badge-success-border)]',
        warning: 'bg-[var(--naf-badge-warning-bg)] text-[var(--naf-badge-warning-fg)] border border-[var(--naf-badge-warning-border)]',
        danger: 'bg-[var(--naf-badge-danger-bg)] text-[var(--naf-badge-danger-fg)] border border-[var(--naf-badge-danger-border)]',
        accent: 'bg-[var(--naf-badge-accent-bg)] text-[var(--naf-badge-accent-fg)] border border-[var(--naf-badge-accent-border)]',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };

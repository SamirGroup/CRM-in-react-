import { cn } from '@/lib/cn';
import { forwardRef, type HTMLAttributes } from 'react';

const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'animate-pulse rounded-md bg-[var(--naf-border-subtle)]',
        className
      )}
      {...props}
    />
  )
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };

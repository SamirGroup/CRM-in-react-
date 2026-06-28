import { cn } from '@/lib/cn';
import { forwardRef, type HTMLAttributes } from 'react';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full bg-[var(--naf-chrome-bg)] border border-[var(--naf-border-subtle)]',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement?.querySelector('.avatar-fallback')?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div
          className={cn(
            'avatar-fallback flex h-full w-full items-center justify-center font-medium text-[var(--naf-body-fg-muted)]',
            src ? 'hidden' : ''
          )}
        >
          {fallback || (alt?.charAt(0).toUpperCase())}
        </div>
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };

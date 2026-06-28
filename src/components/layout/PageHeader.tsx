import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  variant?: 'standard' | 'mobile-adaptive';
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  variant = 'standard',
  className,
}: PageHeaderProps) {
  if (variant === 'mobile-adaptive') {
    return (
      <div className={cn('mb-6', className)}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--naf-body-fg)]">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-[var(--naf-body-fg-muted)] mt-1">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('mb-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--naf-body-fg)]">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-[var(--naf-body-fg-muted)] mt-1">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

import { cn } from '@/lib/cn';
import { Button } from './Button';
import type { LucideIcon } from 'lucide-react';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center',
        className
      )}
    >
      {Icon && (
        <div className="h-16 w-16 rounded-full bg-[var(--naf-chrome-bg)] flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-[var(--naf-body-fg-muted)]" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-[var(--naf-body-fg)] mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[var(--naf-body-fg-muted)] mb-4 max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

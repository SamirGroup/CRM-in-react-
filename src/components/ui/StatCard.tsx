import { cn } from '@/lib/cn';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Badge } from './Badge';
import { useCountUp } from '@/hooks/useCountUp';
import type { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'var(--naf-accent)',
  className,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  const animatedValue = useCountUp({ end: typeof value === 'number' ? value : 0, duration: 800 });
  const displayValue = typeof value === 'number' ? Number(animatedValue).toLocaleString('uz-UZ') : value;

  return (
    <Card className={cn('overflow-hidden transition-shadow hover:shadow-md', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[var(--naf-body-fg-muted)]">
          {title}
        </CardTitle>
        {Icon && (
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `color-mix(in srgb, ${iconColor} 16%, transparent)` }}
          >
            <Icon className="h-5 w-5" style={{ color: iconColor }} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[var(--naf-body-fg)]">{displayValue}</div>
        {change !== undefined && (
          <div className="flex items-center mt-1">
            <Badge
              variant={isPositive ? 'success' : isNegative ? 'danger' : 'neutral'}
              className="text-xs"
            >
              {isPositive ? '↑' : isNegative ? '↓' : '→'} {Math.abs(change)}%
            </Badge>
            <span className="ml-2 text-xs text-[var(--naf-body-fg-muted)]">
              o'tgan oyga nisbatan
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface SummaryCardRow {
  label: string;
  value: string;
}

export interface SummaryCardProps {
  title: string;
  to: string;
  accent: 'accent' | 'success' | 'danger';
  rows: SummaryCardRow[];
}

const ACCENT_BORDER: Record<SummaryCardProps['accent'], string> = {
  accent: 'var(--naf-chart-series-2)',
  success: 'var(--naf-status-confirmed-fg)',
  danger: 'var(--naf-danger)',
};

export function SummaryCard({ title, to, accent, rows }: SummaryCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        'naf-surface-raised flex flex-col gap-3 p-4 border-l-4 transition-shadow hover:shadow-md'
      )}
      style={{ borderLeftColor: ACCENT_BORDER[accent] }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[var(--naf-body-fg)]">{title}</h3>
        <ChevronRight className="h-4 w-4 text-[var(--naf-body-fg-muted)]" />
      </div>
      <dl className="space-y-1.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <dt className="text-[var(--naf-body-fg-muted)]">{row.label}</dt>
            <dd className="font-medium text-[var(--naf-body-fg)]">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}

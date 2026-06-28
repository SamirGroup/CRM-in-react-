import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { ReportEntry } from '@/lib/reportsCatalog';
import { useTranslation } from '@/hooks/useTranslation';

const ACCENT_COLOR: Record<ReportEntry['accent'], string> = {
  accent: 'var(--naf-accent)',
  success: 'var(--naf-status-confirmed-fg)',
  warning: 'var(--naf-badge-warning-fg)',
  danger: 'var(--naf-danger)',
};

export function ReportCard({ to, titleKey, descriptionKey, icon: Icon, accent }: ReportEntry) {
  const color = ACCENT_COLOR[accent];
  const { t } = useTranslation();

  return (
    <Link
      to={to}
      className="naf-surface-raised naf-card-hover group flex items-start gap-4 p-5"
    >
      <span
        className="naf-icon-chip h-12 w-12 shrink-0"
        style={{ '--chip-color': color } as React.CSSProperties}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[var(--naf-body-fg)] leading-snug">{t(titleKey)}</h3>
        <p className="text-sm text-[var(--naf-body-fg-muted)] mt-1 leading-relaxed">
          {t(descriptionKey)}
        </p>
      </div>
      <ChevronRight className="h-5 w-5 text-[var(--naf-body-fg-faint)] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--naf-accent)]" />
    </Link>
  );
}

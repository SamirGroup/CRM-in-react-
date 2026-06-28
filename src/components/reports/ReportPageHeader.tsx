import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export interface ReportPageHeaderProps {
  title: string;
  description?: string;
}

export function ReportPageHeader({ title, description }: ReportPageHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <Link
        to="/hisobot"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--naf-body-fg-muted)] hover:text-[var(--naf-accent)] mb-3 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.back')}
      </Link>
      <h1 className="text-2xl font-bold text-[var(--naf-body-fg)]">{title}</h1>
      {description && (
        <p className="text-sm text-[var(--naf-body-fg-muted)] mt-1">{description}</p>
      )}
    </div>
  );
}

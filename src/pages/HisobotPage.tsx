import { useState } from 'react';
import { cn } from '@/lib/cn';
import { PageHeader } from '@/components/layout/PageHeader';
import { REPORTS_CATALOG } from '@/lib/reportsCatalog';
import { ReportCard } from '@/components/reports/ReportCard';
import { HisobotOverview } from '@/components/reports/HisobotOverview';
import { useTranslation } from '@/hooks/useTranslation';

type TabKey = 'overview' | 'all';

export function HisobotPage() {
  const [tab, setTab] = useState<TabKey>('all');
  const { t } = useTranslation();

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'overview', label: t('hisobot.tabs.overview') },
    { key: 'all', label: t('hisobot.tabs.all') },
  ];

  return (
    <div>
      <PageHeader title={t('hisobot.title')} variant="mobile-adaptive" />

      <div className="flex gap-1 border-b border-[var(--naf-border-subtle)] mb-6 overflow-x-auto">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
              tab === item.key
                ? 'border-[var(--naf-accent)] text-[var(--naf-accent)]'
                : 'border-transparent text-[var(--naf-body-fg-muted)] hover:text-[var(--naf-body-fg)]'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'overview' ? (
        <HisobotOverview />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {REPORTS_CATALOG.map((report) => (
            <ReportCard key={report.slug} {...report} />
          ))}
        </div>
      )}
    </div>
  );
}

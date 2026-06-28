import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { useTranslation } from '@/hooks/useTranslation';
import type { LucideIcon } from 'lucide-react';

export interface PlaceholderPageProps {
  titleKey: string;
  icon?: LucideIcon;
}

export function PlaceholderPage({ titleKey, icon }: PlaceholderPageProps) {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t(titleKey)} variant="mobile-adaptive" />
      <Card>
        <CardContent className="p-0">
          <EmptyState
            icon={icon}
            title={t('common.comingSoonTitle')}
            description={t('common.comingSoonDescription')}
          />
        </CardContent>
      </Card>
    </div>
  );
}

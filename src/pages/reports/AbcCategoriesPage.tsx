import { AbcReportPage, type AbcRow } from './AbcReportPage';
import { useTranslation } from '@/hooks/useTranslation';

const rows: AbcRow[] = [
  { name: 'Telefonlar', revenue: 124500000, share: 44.5, grade: 'A' },
  { name: 'Noutbuklar', revenue: 78000000, share: 27.9, grade: 'A' },
  { name: 'Planshetlar', revenue: 38000000, share: 13.6, grade: 'B' },
  { name: 'Quloqchinlar', revenue: 24000000, share: 8.6, grade: 'B' },
  { name: 'Aksessuarlar', revenue: 15300000, share: 5.4, grade: 'C' },
];

export function AbcCategoriesPage() {
  const { t } = useTranslation();

  return (
    <AbcReportPage
      title={t('reports.abcCategories.title')}
      description={t('reports.abcCategories.description')}
      entityLabel={t('abc.entityCategory')}
      rows={rows}
    />
  );
}

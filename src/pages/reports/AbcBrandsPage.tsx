import { AbcReportPage, type AbcRow } from './AbcReportPage';
import { useTranslation } from '@/hooks/useTranslation';

const rows: AbcRow[] = [
  { name: 'Apple', revenue: 142500000, share: 51.0, grade: 'A' },
  { name: 'Samsung', revenue: 78000000, share: 27.9, grade: 'A' },
  { name: 'Xiaomi', revenue: 32000000, share: 11.5, grade: 'B' },
  { name: 'JBL', revenue: 16800000, share: 6.0, grade: 'B' },
  { name: 'Sony', revenue: 10000000, share: 3.6, grade: 'C' },
];

export function AbcBrandsPage() {
  const { t } = useTranslation();

  return (
    <AbcReportPage
      title={t('reports.abcBrands.title')}
      description={t('reports.abcBrands.description')}
      entityLabel={t('abc.entityBrand')}
      rows={rows}
    />
  );
}

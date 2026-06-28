import { AbcReportPage, type AbcRow } from './AbcReportPage';
import { useTranslation } from '@/hooks/useTranslation';

const rows: AbcRow[] = [
  { name: 'iPhone 15 Pro', revenue: 67500000, share: 24.1, grade: 'A' },
  { name: 'Samsung S24 Ultra', revenue: 57000000, share: 20.4, grade: 'A' },
  { name: 'MacBook Air M3', revenue: 55000000, share: 19.6, grade: 'A' },
  { name: 'iPad Air 5', revenue: 28000000, share: 10.0, grade: 'B' },
  { name: 'AirPods Pro 2', revenue: 19500000, share: 7.0, grade: 'B' },
  { name: 'JBL Tune 510BT', revenue: 9800000, share: 3.5, grade: 'C' },
  { name: 'Sony WH-CH520', revenue: 6200000, share: 2.2, grade: 'C' },
];

export function AbcProductsPage() {
  const { t } = useTranslation();

  return (
    <AbcReportPage
      title={t('reports.abcProducts.title')}
      description={t('reports.abcProducts.description')}
      entityLabel={t('abc.entityProduct')}
      rows={rows}
    />
  );
}

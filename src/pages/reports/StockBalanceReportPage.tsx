import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { ReportPageHeader } from '@/components/reports/ReportPageHeader';
import { useTranslation } from '@/hooks/useTranslation';

interface StockBalanceRow {
  category: string;
  optimal: number;
  current: number;
}

const rows: StockBalanceRow[] = [
  { category: 'Telefonlar', optimal: 80, current: 124 },
  { category: 'Noutbuklar', optimal: 40, current: 36 },
  { category: 'Planshetlar', optimal: 30, current: 18 },
  { category: 'Quloqchinlar', optimal: 60, current: 95 },
  { category: 'Aksessuarlar', optimal: 90, current: 88 },
];

function statusOf(row: StockBalanceRow) {
  const ratio = row.current / row.optimal;
  if (ratio > 1.2) return 'over' as const;
  if (ratio < 0.8) return 'under' as const;
  return 'normal' as const;
}

const overCount = rows.filter((r) => statusOf(r) === 'over').length;
const underCount = rows.filter((r) => statusOf(r) === 'under').length;
const normalCount = rows.filter((r) => statusOf(r) === 'normal').length;

export function StockBalanceReportPage() {
  const { t } = useTranslation();

  const statusLabel = (status: ReturnType<typeof statusOf>) =>
    status === 'over' ? t('oosnos.statusOver') : status === 'under' ? t('oosnos.statusUnder') : t('oosnos.statusNormal');

  return (
    <div>
      <ReportPageHeader title={t('reports.oosnos.title')} description={t('reports.oosnos.description')} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title={t('oosnos.kpiOver')} value={`${overCount} ${t('oosnos.unitTa')}`} icon={TrendingUp} iconColor="var(--naf-danger)" />
        <StatCard title={t('oosnos.kpiUnder')} value={`${underCount} ${t('oosnos.unitTa')}`} icon={TrendingDown} iconColor="var(--naf-badge-warning-fg)" />
        <StatCard title={t('oosnos.kpiNormal')} value={`${normalCount} ${t('oosnos.unitTa')}`} icon={CheckCircle2} iconColor="var(--naf-chart-series-4)" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('oosnos.chartTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={rows}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--naf-chart-grid)" />
              <XAxis dataKey="category" stroke="var(--naf-body-fg-muted)" fontSize={12} />
              <YAxis stroke="var(--naf-body-fg-muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--naf-float-bg)',
                  border: '1px solid var(--naf-border-subtle)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => `${value} ${t('oosnos.unitDona')}`}
              />
              <Legend />
              <Bar dataKey="optimal" fill="var(--naf-chart-series-5)" name={t('oosnos.seriesOptimal')} radius={[4, 4, 0, 0]} />
              <Bar dataKey="current" fill="var(--naf-accent)" name={t('oosnos.seriesCurrent')} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 flex flex-wrap gap-2">
            {rows.map((row) => {
              const status = statusOf(row);
              return (
                <Badge
                  key={row.category}
                  variant={status === 'over' ? 'danger' : status === 'under' ? 'warning' : 'success'}
                >
                  {row.category}: {statusLabel(status)}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

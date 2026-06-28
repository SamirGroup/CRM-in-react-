import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { PackagePlus, ShoppingCart, RotateCcw, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { ReportPageHeader } from '@/components/reports/ReportPageHeader';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

const turnoverData = [
  { month: 'Yan', kirim: 38000000, savdo: 45000000, qaytarish: 2100000 },
  { month: 'Fev', kirim: 42000000, savdo: 52000000, qaytarish: 1800000 },
  { month: 'Mar', kirim: 35000000, savdo: 48000000, qaytarish: 2600000 },
  { month: 'Apr', kirim: 51000000, savdo: 61000000, qaytarish: 1500000 },
  { month: 'May', kirim: 47000000, savdo: 58000000, qaytarish: 2300000 },
  { month: 'Iyn', kirim: 58000000, savdo: 72000000, qaytarish: 1900000 },
];

const totalKirim = turnoverData.reduce((sum, m) => sum + m.kirim, 0);
const totalSavdo = turnoverData.reduce((sum, m) => sum + m.savdo, 0);
const totalQaytarish = turnoverData.reduce((sum, m) => sum + m.qaytarish, 0);
const grossProfit = totalSavdo - totalKirim - totalQaytarish;

export function ProductTurnoverReportPage() {
  const { t } = useTranslation();

  const profitSplit = [
    { name: t('turnover.profitMonths'), value: 5, color: 'var(--naf-chart-series-4)' },
    { name: t('turnover.lossMonths'), value: 1, color: 'var(--naf-danger)' },
  ];

  return (
    <div>
      <ReportPageHeader title={t('reports.turnover.title')} description={t('reports.turnover.description')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('turnover.kpiIncome')} value={formatCurrency(totalKirim)} icon={PackagePlus} iconColor="var(--naf-chart-series-2)" />
        <StatCard title={t('turnover.kpiSales')} value={formatCurrency(totalSavdo)} icon={ShoppingCart} iconColor="var(--naf-chart-series-4)" />
        <StatCard title={t('turnover.kpiReturns')} value={formatCurrency(totalQaytarish)} icon={RotateCcw} iconColor="var(--naf-danger)" />
        <StatCard title={t('turnover.kpiGrossProfit')} value={formatCurrency(grossProfit)} icon={TrendingUp} iconColor="var(--naf-accent)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('turnover.chartTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={turnoverData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--naf-chart-grid)" />
                <XAxis dataKey="month" stroke="var(--naf-body-fg-muted)" fontSize={12} />
                <YAxis stroke="var(--naf-body-fg-muted)" fontSize={12} tickFormatter={(v) => `${v / 1000000}M`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--naf-float-bg)',
                    border: '1px solid var(--naf-border-subtle)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Bar dataKey="kirim" fill="var(--naf-chart-series-2)" name={t('turnover.seriesIncome')} radius={[4, 4, 0, 0]} />
                <Bar dataKey="savdo" fill="var(--naf-chart-series-4)" name={t('turnover.seriesSales')} radius={[4, 4, 0, 0]} />
                <Bar dataKey="qaytarish" fill="var(--naf-danger)" name={t('turnover.seriesReturns')} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('turnover.profitChartTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={profitSplit}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ value }) => `${value} ${t('turnover.monthsUnit')}`}
                  labelLine={false}
                >
                  {profitSplit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--naf-float-bg)',
                    border: '1px solid var(--naf-border-subtle)',
                    borderRadius: '8px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

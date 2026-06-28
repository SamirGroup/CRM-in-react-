import {
  ComposedChart,
  Bar,
  Line,
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
import { DollarSign, TrendingDown, TrendingUp, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { ReportPageHeader } from '@/components/reports/ReportPageHeader';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

const monthlyData = [
  { month: 'Yan', daromad: 45000000, xarajat: 33000000, foyda: 12000000 },
  { month: 'Fev', daromad: 52000000, xarajat: 37000000, foyda: 15000000 },
  { month: 'Mar', daromad: 48000000, xarajat: 34500000, foyda: 13500000 },
  { month: 'Apr', daromad: 61000000, xarajat: 43000000, foyda: 18000000 },
  { month: 'May', daromad: 58000000, xarajat: 41500000, foyda: 16500000 },
  { month: 'Iyn', daromad: 72000000, xarajat: 50000000, foyda: 22000000 },
];

const totalRevenue = monthlyData.reduce((sum, m) => sum + m.daromad, 0);
const totalExpense = monthlyData.reduce((sum, m) => sum + m.xarajat, 0);
const totalProfit = totalRevenue - totalExpense;
const margin = (totalProfit / totalRevenue) * 100;

export function PnLReportPage() {
  const { t } = useTranslation();

  const expenseBreakdown = [
    { name: t('pnl.expenseCost'), value: 145000000, color: 'var(--naf-chart-series-1)' },
    { name: t('pnl.expenseSalary'), value: 48000000, color: 'var(--naf-chart-series-2)' },
    { name: t('pnl.expenseRent'), value: 22000000, color: 'var(--naf-chart-series-3)' },
    { name: t('pnl.expenseLogistics'), value: 14000000, color: 'var(--naf-chart-series-4)' },
    { name: t('pnl.expenseOther'), value: 10000000, color: 'var(--naf-chart-series-5)' },
  ];

  return (
    <div>
      <ReportPageHeader title={t('reports.pnl.title')} description={t('reports.pnl.description')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('pnl.kpiRevenue')} value={formatCurrency(totalRevenue)} icon={DollarSign} iconColor="var(--naf-chart-series-2)" />
        <StatCard title={t('pnl.kpiExpense')} value={formatCurrency(totalExpense)} icon={TrendingDown} iconColor="var(--naf-danger)" />
        <StatCard title={t('pnl.kpiProfit')} value={formatCurrency(totalProfit)} icon={TrendingUp} iconColor="var(--naf-chart-series-4)" />
        <StatCard title={t('pnl.kpiMargin')} value={formatPercent(margin)} icon={Percent} iconColor="var(--naf-accent)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('pnl.chartTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={monthlyData}>
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
                <Bar dataKey="daromad" fill="var(--naf-chart-series-2)" name={t('pnl.seriesRevenue')} radius={[4, 4, 0, 0]} />
                <Bar dataKey="xarajat" fill="var(--naf-danger)" name={t('pnl.seriesExpense')} radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="foyda" stroke="var(--naf-chart-series-4)" strokeWidth={2.5} name={t('pnl.seriesProfit')} dot={{ fill: 'var(--naf-chart-series-4)' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('pnl.expenseChartTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--naf-float-bg)',
                    border: '1px solid var(--naf-border-subtle)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
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

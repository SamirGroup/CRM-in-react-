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
} from 'recharts';
import { Wallet, ArrowDownToLine, ArrowUpFromLine, PiggyBank } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { ReportPageHeader } from '@/components/reports/ReportPageHeader';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

const openingBalance = 620000000;

const monthlyFlow = [
  { month: 'Yan', tushum: 48000000, chiqim: 31000000 },
  { month: 'Fev', tushum: 55000000, chiqim: 36000000 },
  { month: 'Mar', tushum: 51000000, chiqim: 33500000 },
  { month: 'Apr', tushum: 64000000, chiqim: 41000000 },
  { month: 'May', tushum: 60000000, chiqim: 39500000 },
  { month: 'Iyn', tushum: 75000000, chiqim: 47000000 },
];

let running = openingBalance;
const flowWithBalance = monthlyFlow.map((m) => {
  running = running + m.tushum - m.chiqim;
  return { ...m, balans: running };
});

const totalIn = monthlyFlow.reduce((sum, m) => sum + m.tushum, 0);
const totalOut = monthlyFlow.reduce((sum, m) => sum + m.chiqim, 0);
const closingBalance = openingBalance + totalIn - totalOut;

export function CashFlowReportPage() {
  const { t } = useTranslation();

  return (
    <div>
      <ReportPageHeader title={t('reports.cashflow.title')} description={t('reports.cashflow.description')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('cashflow.kpiOpening')} value={formatCurrency(openingBalance)} icon={Wallet} iconColor="var(--naf-chart-series-5)" />
        <StatCard title={t('cashflow.kpiIncome')} value={formatCurrency(totalIn)} icon={ArrowDownToLine} iconColor="var(--naf-chart-series-4)" />
        <StatCard title={t('cashflow.kpiExpense')} value={formatCurrency(totalOut)} icon={ArrowUpFromLine} iconColor="var(--naf-danger)" />
        <StatCard title={t('cashflow.kpiClosing')} value={formatCurrency(closingBalance)} icon={PiggyBank} iconColor="var(--naf-accent)" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('cashflow.chartTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={360}>
            <ComposedChart data={flowWithBalance}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--naf-chart-grid)" />
              <XAxis dataKey="month" stroke="var(--naf-body-fg-muted)" fontSize={12} />
              <YAxis
                yAxisId="flow"
                stroke="var(--naf-body-fg-muted)"
                fontSize={12}
                tickFormatter={(v) => `${v / 1000000}M`}
              />
              <YAxis
                yAxisId="balance"
                orientation="right"
                stroke="var(--naf-accent)"
                fontSize={12}
                tickFormatter={(v) => `${v / 1000000}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--naf-float-bg)',
                  border: '1px solid var(--naf-border-subtle)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend />
              <Bar yAxisId="flow" dataKey="tushum" fill="var(--naf-chart-series-4)" name={t('cashflow.seriesIncome')} radius={[4, 4, 0, 0]} />
              <Bar yAxisId="flow" dataKey="chiqim" fill="var(--naf-danger)" name={t('cashflow.seriesExpense')} radius={[4, 4, 0, 0]} />
              <Line
                yAxisId="balance"
                type="monotone"
                dataKey="balans"
                stroke="var(--naf-accent)"
                strokeWidth={2.5}
                name={t('cashflow.seriesBalance')}
                dot={{ fill: 'var(--naf-accent)' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

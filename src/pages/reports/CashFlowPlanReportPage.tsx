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
import { Target, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { ReportPageHeader } from '@/components/reports/ReportPageHeader';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

const planData = [
  { month: 'Yan', reja: 50000000, haqiqiy: 48000000 },
  { month: 'Fev', reja: 55000000, haqiqiy: 55000000 },
  { month: 'Mar', reja: 55000000, haqiqiy: 51000000 },
  { month: 'Apr', reja: 62000000, haqiqiy: 64000000 },
  { month: 'May', reja: 62000000, haqiqiy: 60000000 },
  { month: 'Iyn', reja: 70000000, haqiqiy: 75000000 },
];

const totalPlan = planData.reduce((sum, m) => sum + m.reja, 0);
const totalActual = planData.reduce((sum, m) => sum + m.haqiqiy, 0);
const executionRate = (totalActual / totalPlan) * 100;
const missedMonths = planData.filter((m) => m.haqiqiy < m.reja).length;

export function CashFlowPlanReportPage() {
  const { t } = useTranslation();

  return (
    <div>
      <ReportPageHeader title={t('reports.cashflowplan.title')} description={t('reports.cashflowplan.description')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('cashflowplan.kpiPlanned')} value={formatCurrency(totalPlan)} icon={Target} iconColor="var(--naf-chart-series-5)" />
        <StatCard title={t('cashflowplan.kpiActual')} value={formatCurrency(totalActual)} icon={CheckCircle2} iconColor="var(--naf-chart-series-4)" />
        <StatCard
          title={t('cashflowplan.kpiExecution')}
          value={formatPercent(executionRate)}
          change={executionRate - 100}
          icon={Target}
          iconColor="var(--naf-accent)"
        />
        <StatCard title={t('cashflowplan.kpiMissed')} value={`${missedMonths} ${t('turnover.monthsUnit')}`} icon={AlertTriangle} iconColor="var(--naf-danger)" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('cashflowplan.chartTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={planData}>
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
              <Bar dataKey="reja" fill="var(--naf-chart-series-5)" name={t('cashflowplan.seriesPlanned')} radius={[4, 4, 0, 0]} />
              <Bar dataKey="haqiqiy" fill="var(--naf-accent)" name={t('cashflowplan.seriesActual')} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

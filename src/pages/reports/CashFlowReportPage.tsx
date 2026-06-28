import { useEffect } from 'react';
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
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { ReportPageHeader } from '@/components/reports/ReportPageHeader';
import { EditableNumberCell } from '@/components/reports/EditableNumberCell';
import { EditableAmountListCard } from '@/components/reports/EditableAmountListCard';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';
import { useCashFlowDetailStore } from '@/store/useCashFlowDetailStore';

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

export function CashFlowReportPage() {
  const { t } = useTranslation();
  const { incomeItems, expenseItems, accountFlows, fetchDetail, updateIncomeAmount, updateExpenseAmount, updateAccountFlow } =
    useCashFlowDetailStore();

  useEffect(() => {
    if (incomeItems.length === 0) fetchDetail();
  }, [incomeItems.length, fetchDetail]);

  const totalIn = incomeItems.reduce((sum, i) => sum + i.amount, 0);
  const totalOut = expenseItems.reduce((sum, i) => sum + i.amount, 0);
  const closingBalance = openingBalance + totalIn - totalOut;

  const handleSaved = () => toast.success(t('common.saved'));

  return (
    <div>
      <ReportPageHeader title={t('reports.cashflow.title')} description={t('reports.cashflow.description')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('cashflow.kpiOpening')} value={formatCurrency(openingBalance)} icon={Wallet} iconColor="var(--naf-chart-series-5)" />
        <StatCard title={t('cashflow.kpiIncome')} value={formatCurrency(totalIn)} icon={ArrowDownToLine} iconColor="var(--naf-chart-series-4)" />
        <StatCard title={t('cashflow.kpiExpense')} value={formatCurrency(totalOut)} icon={ArrowUpFromLine} iconColor="var(--naf-danger)" />
        <StatCard title={t('cashflow.kpiClosing')} value={formatCurrency(closingBalance)} icon={PiggyBank} iconColor="var(--naf-accent)" />
      </div>

      <Card className="mb-6">
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

      {/* Editable income / expense breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EditableAmountListCard
          title={t('cashflow.detail.incomeTitle')}
          items={incomeItems}
          onUpdate={updateIncomeAmount}
          onSaved={handleSaved}
          accent="success"
        />
        <EditableAmountListCard
          title={t('cashflow.detail.expenseTitle')}
          items={expenseItems}
          onUpdate={updateExpenseAmount}
          onSaved={handleSaved}
          accent="danger"
        />
      </div>

      {/* Net cash flow per account */}
      <Card>
        <CardHeader>
          <CardTitle>{t('cashflow.detail.netflowTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">{t('cashflow.detail.colId')}</TableHead>
                <TableHead>{t('cashflow.detail.colName')}</TableHead>
                <TableHead className="text-right">{t('cashflow.detail.colIncome')}</TableHead>
                <TableHead className="text-right">{t('cashflow.detail.colExpense')}</TableHead>
                <TableHead className="text-right">{t('cashflow.detail.colDiff')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountFlows.map((row, index) => {
                const diff = row.income - row.expense;
                return (
                  <TableRow key={row.id}>
                    <TableCell className="text-[var(--naf-body-fg-muted)]">{index + 1}</TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="p-1">
                      <EditableNumberCell
                        value={row.income}
                        onCommit={(v) => updateAccountFlow(row.id, 'income', v)}
                        onSaved={handleSaved}
                      />
                    </TableCell>
                    <TableCell className="p-1">
                      <EditableNumberCell
                        value={row.expense}
                        onCommit={(v) => updateAccountFlow(row.id, 'expense', v)}
                        onSaved={handleSaved}
                      />
                    </TableCell>
                    <TableCell
                      className={
                        'text-right font-semibold ' +
                        (diff >= 0 ? 'text-[var(--naf-status-confirmed-fg)]' : 'text-[var(--naf-danger)]')
                      }
                    >
                      {formatCurrency(diff)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

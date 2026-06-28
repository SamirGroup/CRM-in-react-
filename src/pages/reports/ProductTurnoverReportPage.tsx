import { useEffect, Fragment } from 'react';
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
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';
import {
  useProductTurnoverStore,
  type TurnoverGroupKey,
} from '@/store/useProductTurnoverStore';

const turnoverData = [
  { month: 'Yan', kirim: 38000000, savdo: 45000000, qaytarish: 2100000 },
  { month: 'Fev', kirim: 42000000, savdo: 52000000, qaytarish: 1800000 },
  { month: 'Mar', kirim: 35000000, savdo: 48000000, qaytarish: 2600000 },
  { month: 'Apr', kirim: 51000000, savdo: 61000000, qaytarish: 1500000 },
  { month: 'May', kirim: 47000000, savdo: 58000000, qaytarish: 2300000 },
  { month: 'Iyn', kirim: 58000000, savdo: 72000000, qaytarish: 1900000 },
];

const GROUP_TINTS: Record<TurnoverGroupKey, string> = {
  kirim: 'var(--naf-chart-series-4)',
  returnIn: 'var(--naf-badge-warning-fg)',
  sotuv: 'var(--naf-chart-series-2)',
  writeOff: 'var(--naf-danger)',
  returnOut: 'var(--naf-chart-series-5)',
};

function tintStyle(group: TurnoverGroupKey) {
  return { backgroundColor: `color-mix(in srgb, ${GROUP_TINTS[group]} 7%, transparent)` };
}

export function ProductTurnoverReportPage() {
  const { t } = useTranslation();
  const rows = useProductTurnoverStore((s) => s.rows);
  const fetchRows = useProductTurnoverStore((s) => s.fetchRows);
  const updateCell = useProductTurnoverStore((s) => s.updateCell);

  useEffect(() => {
    if (rows.length === 0) fetchRows();
  }, [rows.length, fetchRows]);

  const totalKirim = rows.reduce((sum, r) => sum + r.kirim.costSum, 0);
  const totalSavdo = rows.reduce((sum, r) => sum + r.sotuv.sellSum, 0);
  const totalQaytarish = rows.reduce((sum, r) => sum + r.returnIn.sellSum, 0);
  const grossProfit = rows.reduce((sum, r) => sum + (r.sotuv.sellSum - r.sotuv.costSum), 0);

  const profitSplit = [
    { name: t('turnover.profitMonths'), value: 5, color: 'var(--naf-chart-series-4)' },
    { name: t('turnover.lossMonths'), value: 1, color: 'var(--naf-danger)' },
  ];

  const handleSaved = () => toast.success(t('common.saved'));

  const GROUPS: { key: TurnoverGroupKey; label: string }[] = [
    { key: 'kirim', label: t('turnover.table.groupKirim') },
    { key: 'returnIn', label: t('turnover.table.groupReturnIn') },
    { key: 'sotuv', label: t('turnover.table.groupSotuv') },
    { key: 'writeOff', label: t('turnover.table.groupWriteOff') },
    { key: 'returnOut', label: t('turnover.table.groupReturnOut') },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
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

      {/* Per-product editable turnover table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('turnover.table.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead rowSpan={2} className="align-bottom">{t('turnover.table.colProduct')}</TableHead>
                <TableHead rowSpan={2} className="align-bottom text-center">{t('turnover.table.colUnit')}</TableHead>
                {GROUPS.map((g) => (
                  <TableHead
                    key={g.key}
                    colSpan={g.key === 'sotuv' ? 4 : 3}
                    className="text-center border-l border-[var(--naf-border-subtle)]"
                    style={tintStyle(g.key)}
                  >
                    {g.label}
                  </TableHead>
                ))}
              </TableRow>
              <TableRow>
                {GROUPS.map((g) => (
                  <Fragment key={g.key}>
                    <TableHead className="text-right text-xs border-l border-[var(--naf-border-subtle)]" style={tintStyle(g.key)}>
                      {t('turnover.table.colQty')}
                    </TableHead>
                    <TableHead className="text-right text-xs" style={tintStyle(g.key)}>
                      {t('turnover.table.colCostSum')}
                    </TableHead>
                    <TableHead className="text-right text-xs" style={tintStyle(g.key)}>
                      {t('turnover.table.colSellSum')}
                    </TableHead>
                    {g.key === 'sotuv' && (
                      <TableHead className="text-right text-xs" style={tintStyle(g.key)}>
                        {t('turnover.table.colProfit')}
                      </TableHead>
                    )}
                  </Fragment>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {row.name}
                    <div className="text-xs text-[var(--naf-body-fg-muted)] font-mono">{row.sku}</div>
                  </TableCell>
                  <TableCell className="text-center text-[var(--naf-body-fg-muted)]">{row.unit}</TableCell>

                  {GROUPS.map((g) => {
                    const data = row[g.key];
                    return (
                      <Fragment key={g.key}>
                        <TableCell className="border-l border-[var(--naf-border-subtle)] p-1" style={tintStyle(g.key)}>
                          <EditableNumberCell
                            value={data.qty}
                            onCommit={(v) => updateCell(row.id, g.key, 'qty', v)}
                            onSaved={handleSaved}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell className="p-1" style={tintStyle(g.key)}>
                          <EditableNumberCell
                            value={data.costSum}
                            onCommit={(v) => updateCell(row.id, g.key, 'costSum', v)}
                            onSaved={handleSaved}
                          />
                        </TableCell>
                        <TableCell className="p-1" style={tintStyle(g.key)}>
                          <EditableNumberCell
                            value={data.sellSum}
                            onCommit={(v) => updateCell(row.id, g.key, 'sellSum', v)}
                            onSaved={handleSaved}
                          />
                        </TableCell>
                        {g.key === 'sotuv' && (
                          <TableCell
                            className={
                              'text-right font-medium ' +
                              (data.sellSum - data.costSum >= 0
                                ? 'text-[var(--naf-status-confirmed-fg)]'
                                : 'text-[var(--naf-danger)]')
                            }
                            style={tintStyle('sotuv')}
                          >
                            {formatCurrency(data.sellSum - data.costSum)}
                          </TableCell>
                        )}
                      </Fragment>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { PackageX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { ReportPageHeader } from '@/components/reports/ReportPageHeader';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

interface DeadStockItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  value: number;
  daysIdle: number;
}

const deadStockItems: DeadStockItem[] = [
  { id: '1', name: 'iPhone 13 mini', sku: 'IPH-13-MINI', category: 'Telefonlar', quantity: 6, value: 42000000, daysIdle: 96 },
  { id: '2', name: 'Samsung Galaxy Tab A8', sku: 'SAM-TAB-A8', category: 'Planshetlar', quantity: 4, value: 14800000, daysIdle: 72 },
  { id: '3', name: 'JBL Tune 510BT', sku: 'JBL-510BT', category: 'Quloqchinlar', quantity: 12, value: 6600000, daysIdle: 65 },
  { id: '4', name: 'Xiaomi Redmi Pad SE', sku: 'XMI-PAD-SE', category: 'Planshetlar', quantity: 3, value: 9300000, daysIdle: 58 },
  { id: '5', name: 'Sony WH-CH520', sku: 'SNY-CH520', category: 'Quloqchinlar', quantity: 9, value: 5400000, daysIdle: 41 },
];

const bucketBoundaries = [
  { bucket: '30-45', count: 1, color: 'var(--naf-badge-warning-fg)' },
  { bucket: '46-60', count: 2, color: 'var(--naf-badge-warning-fg)' },
  { bucket: '61-90', count: 1, color: 'var(--naf-danger)' },
  { bucket: '90+', count: 1, color: 'var(--naf-danger)' },
];

const totalValue = deadStockItems.reduce((sum, i) => sum + i.value, 0);
const totalQty = deadStockItems.reduce((sum, i) => sum + i.quantity, 0);

export function DeadStockReportPage() {
  const { t } = useTranslation();

  const bucketData = bucketBoundaries.map((b) => ({ ...b, bucket: `${b.bucket} ${t('deadstock.dayUnit')}` }));

  const idleBadge = (days: number) => {
    const label = `${days} ${t('deadstock.dayUnit')}`;
    if (days >= 90) return <Badge variant="danger">{label}</Badge>;
    if (days >= 60) return <Badge variant="warning">{label}</Badge>;
    return <Badge variant="neutral">{label}</Badge>;
  };

  return (
    <div>
      <ReportPageHeader title={t('reports.deadstock.title')} description={t('reports.deadstock.description')} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title={t('deadstock.kpiTypes')} value={deadStockItems.length} icon={PackageX} iconColor="var(--naf-danger)" />
        <StatCard title={t('deadstock.kpiQty')} value={`${totalQty} ${t('deadstock.dona')}`} icon={PackageX} iconColor="var(--naf-badge-warning-fg)" />
        <StatCard title={t('deadstock.kpiFrozenValue')} value={formatCurrency(totalValue)} icon={PackageX} iconColor="var(--naf-chart-series-5)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t('deadstock.bucketChartTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={bucketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--naf-chart-grid)" />
                <XAxis dataKey="bucket" stroke="var(--naf-body-fg-muted)" fontSize={11} />
                <YAxis stroke="var(--naf-body-fg-muted)" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--naf-float-bg)',
                    border: '1px solid var(--naf-border-subtle)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `${value} ${t('deadstock.bucketCountUnit')}`}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} name={t('deadstock.bucketCountUnit')}>
                  {bucketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('deadstock.tableTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('deadstock.colSku')}</TableHead>
                  <TableHead>{t('deadstock.colName')}</TableHead>
                  <TableHead>{t('deadstock.colCategory')}</TableHead>
                  <TableHead className="text-center">{t('deadstock.colQty')}</TableHead>
                  <TableHead className="text-right">{t('deadstock.colValue')}</TableHead>
                  <TableHead className="text-center">{t('deadstock.colIdleDays')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deadStockItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-center">{item.quantity} {t('deadstock.dona')}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
                    <TableCell className="text-center">{idleBadge(item.daysIdle)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Boxes, Package, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { ReportPageHeader } from '@/components/reports/ReportPageHeader';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

const categoryStock = [
  { name: 'Telefonlar', value: 38, color: 'var(--naf-chart-series-1)' },
  { name: 'Noutbuklar', value: 22, color: 'var(--naf-chart-series-2)' },
  { name: 'Planshetlar', value: 14, color: 'var(--naf-chart-series-3)' },
  { name: 'Quloqchinlar', value: 18, color: 'var(--naf-chart-series-4)' },
  { name: 'Boshqa', value: 8, color: 'var(--naf-chart-series-5)' },
];

const brandStock = [
  { name: 'Apple', qty: 142 },
  { name: 'Samsung', qty: 118 },
  { name: 'Xiaomi', qty: 96 },
  { name: 'JBL', qty: 54 },
  { name: 'Sony', qty: 38 },
];

const totalValue = 1179000000;
const totalSkuCount = 3542;
const avgStockDays = 18;

export function StockReportPage() {
  const { t } = useTranslation();

  return (
    <div>
      <ReportPageHeader title={t('reports.stock.title')} description={t('reports.stock.description')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard title={t('stock.kpiSkuCount')} value={totalSkuCount} icon={Package} iconColor="var(--naf-chart-series-2)" />
        <StatCard title={t('stock.kpiTotalValue')} value={formatCurrency(totalValue)} icon={Boxes} iconColor="var(--naf-accent)" />
        <StatCard title={t('stock.kpiAvgDays')} value={`${avgStockDays} ${t('stock.kpiAvgDaysUnit')}`} icon={Clock} iconColor="var(--naf-chart-series-5)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('stock.categoryChartTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryStock}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryStock.map((entry, index) => (
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

        <Card>
          <CardHeader>
            <CardTitle>{t('stock.brandChartTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={brandStock} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--naf-chart-grid)" />
                <XAxis type="number" stroke="var(--naf-body-fg-muted)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--naf-body-fg-muted)" fontSize={12} width={70} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--naf-float-bg)',
                    border: '1px solid var(--naf-border-subtle)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `${value} ${t('oosnos.unitDona')}`}
                />
                <Bar dataKey="qty" fill="var(--naf-accent)" radius={[0, 4, 4, 0]} name={t('deadstock.colQty')} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

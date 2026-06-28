import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { Select } from '@/components/ui/Select';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

const revenueTrendData = [
  { month: 'Yan', revenue: 45000000, profit: 12000000 },
  { month: 'Fev', revenue: 52000000, profit: 15000000 },
  { month: 'Mar', revenue: 48000000, profit: 13500000 },
  { month: 'Apr', revenue: 61000000, profit: 18000000 },
  { month: 'May', revenue: 58000000, profit: 16500000 },
  { month: 'Iyn', revenue: 72000000, profit: 22000000 },
];

const categoryData = [
  { name: 'Telefonlar', value: 35, color: 'var(--naf-chart-series-1)' },
  { name: 'Noutbuklar', value: 25, color: 'var(--naf-chart-series-2)' },
  { name: 'Planshetlar', value: 15, color: 'var(--naf-chart-series-3)' },
  { name: 'Quloqchinlar', value: 15, color: 'var(--naf-chart-series-4)' },
  { name: 'Boshqa', value: 10, color: 'var(--naf-chart-series-5)' },
];

const conversionData = [
  { day: 'Dush', visitors: 1200, leads: 180, sales: 45 },
  { day: 'Sesh', visitors: 1400, leads: 210, sales: 52 },
  { day: 'Chor', visitors: 1100, leads: 165, sales: 38 },
  { day: 'Pay', visitors: 1600, leads: 240, sales: 62 },
  { day: 'Juma', visitors: 1800, leads: 270, sales: 71 },
  { day: 'Shan', visitors: 900, leads: 135, sales: 32 },
  { day: 'Yak', visitors: 700, leads: 105, sales: 25 },
];

export function HisobotOverview() {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [branchFilter, setBranchFilter] = useState('all');
  const { t } = useTranslation();

  const stats = [
    { title: t('hisobot.overview.statRevenue'), value: formatCurrency(336000000), change: 12.5, icon: DollarSign, color: 'var(--naf-chart-series-1)' },
    { title: t('hisobot.overview.statProfit'), value: formatCurrency(97000000), change: 8.3, icon: TrendingUp, color: 'var(--naf-chart-series-4)' },
    { title: t('hisobot.overview.statOrders'), value: '1,247', change: 15.2, icon: ShoppingCart, color: 'var(--naf-chart-series-2)' },
    { title: t('hisobot.overview.statAvgCheck'), value: formatCurrency(269500), change: -2.1, icon: DollarSign, color: 'var(--naf-chart-series-3)' },
  ];

  return (
    <div>
      <div className="flex justify-end gap-2 mb-6">
        <Select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          options={[
            { value: 'all', label: t('common.allBranches') },
            { value: '1', label: 'Toshkent Markaziy' },
            { value: '2', label: 'Samarqand' },
          ]}
        />
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="naf-card-hover">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--naf-body-fg-muted)]">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-1 text-sm ${stat.change >= 0 ? 'text-[var(--naf-status-confirmed-fg)]' : 'text-[var(--naf-status-rejected-fg)]'}`}>
                    {stat.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <span className="naf-icon-chip h-12 w-12" style={{ '--chip-color': stat.color } as React.CSSProperties}>
                  <stat.icon className="h-6 w-6" />
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue & Profit Trend */}
        <Card>
          <CardHeader>
            <CardTitle>{t('hisobot.overview.revenueProfitChart')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueTrendData}>
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
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--naf-chart-series-1)"
                  fill="var(--naf-chart-series-1)"
                  fillOpacity={0.2}
                  name={t('hisobot.overview.seriesRevenue')}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="var(--naf-chart-series-4)"
                  fill="var(--naf-chart-series-4)"
                  fillOpacity={0.2}
                  name={t('hisobot.overview.seriesProfit')}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{t('hisobot.overview.categoryChart')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>{t('hisobot.overview.conversionChart')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--naf-chart-grid)" />
              <XAxis dataKey="day" stroke="var(--naf-body-fg-muted)" fontSize={12} />
              <YAxis stroke="var(--naf-body-fg-muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--naf-float-bg)',
                  border: '1px solid var(--naf-border-subtle)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="visitors" fill="var(--naf-chart-series-2)" name={t('hisobot.overview.seriesVisitors')} radius={[4, 4, 0, 0]} />
              <Bar dataKey="leads" fill="var(--naf-chart-series-1)" name={t('hisobot.overview.seriesLeads')} radius={[4, 4, 0, 0]} />
              <Bar dataKey="sales" fill="var(--naf-chart-series-4)" name={t('hisobot.overview.seriesSales')} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

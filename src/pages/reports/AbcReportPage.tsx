import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ListOrdered } from 'lucide-react';
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
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

export type AbcGrade = 'A' | 'B' | 'C';

export interface AbcRow {
  name: string;
  revenue: number;
  share: number;
  grade: AbcGrade;
}

const GRADE_BADGE: Record<AbcGrade, 'success' | 'warning' | 'danger'> = {
  A: 'success',
  B: 'warning',
  C: 'danger',
};

const GRADE_COLOR: Record<AbcGrade, string> = {
  A: 'var(--naf-chart-series-4)',
  B: 'var(--naf-badge-warning-fg)',
  C: 'var(--naf-danger)',
};

export interface AbcReportPageProps {
  title: string;
  description: string;
  entityLabel: string;
  rows: AbcRow[];
}

export function AbcReportPage({ title, description, entityLabel, rows }: AbcReportPageProps) {
  const { t } = useTranslation();

  const gradeCounts = (['A', 'B', 'C'] as const).map((grade) => ({
    grade,
    count: rows.filter((r) => r.grade === grade).length,
    revenue: rows.filter((r) => r.grade === grade).reduce((sum, r) => sum + r.revenue, 0),
  }));

  const pieData = gradeCounts.map((g) => ({
    name: `${g.grade} ${t('abc.groupSuffix')}`,
    value: g.revenue,
    color: GRADE_COLOR[g.grade],
  }));

  return (
    <div>
      <ReportPageHeader title={title} description={description} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {gradeCounts.map((g) => (
          <StatCard
            key={g.grade}
            title={`${g.grade} ${t('abc.groupSuffix')} — ${entityLabel}`}
            value={`${g.count} ${t('abc.unitTa')}`}
            icon={ListOrdered}
            iconColor={GRADE_COLOR[g.grade]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('abc.chartTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
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

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{entityLabel} {t('abc.tableTitleSuffix')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{entityLabel}</TableHead>
                  <TableHead className="text-right">{t('abc.colRevenue')}</TableHead>
                  <TableHead className="text-right">{t('abc.colShare')}</TableHead>
                  <TableHead className="text-center">{t('abc.colGroup')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-right">{formatCurrency(row.revenue)}</TableCell>
                    <TableCell className="text-right">{formatPercent(row.share)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={GRADE_BADGE[row.grade]}>{row.grade}</Badge>
                    </TableCell>
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

import { useEffect, useState } from 'react';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { PlanModal } from '@/components/moliya/PlanModal';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';
import { useMoliyaStore } from '@/store/useMoliyaStore';

export interface PlanListPageProps {
  type: 'income' | 'expense';
}

export function PlanListPage({ type }: PlanListPageProps) {
  const { t } = useTranslation();
  const { plans, fetchPlans } = useMoliyaStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (plans.length === 0) fetchPlans();
  }, [plans.length, fetchPlans]);

  const rows = plans.filter((p) => p.type === type);

  return (
    <div>
      <PageHeader
        title={t(type === 'income' ? 'pages.tushumReja' : 'pages.chiqimReja')}
        variant="mobile-adaptive"
        actions={
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            {t('moliya.newButton')}
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <EmptyState
              icon={type === 'income' ? TrendingUp : TrendingDown}
              title={t('moliya.emptyTitle')}
              description={type === 'income' ? t('moliya.emptyDescriptionIncome') : t('moliya.emptyDescriptionExpense')}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>{t('moliya.colPeriod')}</TableHead>
                  <TableHead>{t('moliya.colCategory')}</TableHead>
                  <TableHead className="text-right">{t('moliya.colAmount')}</TableHead>
                  <TableHead>{t('moliya.colNote')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((plan, index) => (
                  <TableRow key={plan.id}>
                    <TableCell className="text-[var(--naf-body-fg-muted)]">{index + 1}</TableCell>
                    <TableCell>{plan.period}</TableCell>
                    <TableCell className="font-medium">{plan.category}</TableCell>
                    <TableCell
                      className={
                        'text-right font-semibold ' +
                        (type === 'income' ? 'text-[var(--naf-status-confirmed-fg)]' : 'text-[var(--naf-danger)]')
                      }
                    >
                      {formatCurrency(plan.amount)}
                    </TableCell>
                    <TableCell className="text-[var(--naf-body-fg-muted)]">{plan.note || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <PlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={type} />
    </div>
  );
}

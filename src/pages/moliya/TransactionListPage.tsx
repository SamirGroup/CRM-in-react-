import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Plus, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { TransactionModal } from '@/components/moliya/TransactionModal';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';
import { useMoliyaStore } from '@/store/useMoliyaStore';

export interface TransactionListPageProps {
  type: 'income' | 'expense';
}

export function TransactionListPage({ type }: TransactionListPageProps) {
  const { t } = useTranslation();
  const { transactions, fetchTransactions } = useMoliyaStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (transactions.length === 0) fetchTransactions();
  }, [transactions.length, fetchTransactions]);

  const rows = transactions.filter((tx) => tx.type === type);
  const today = new Date().toISOString().slice(0, 10);
  const todayTotal = rows.filter((tx) => tx.date.slice(0, 10) === today).reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div>
      <PageHeader
        title={t(type === 'income' ? 'nav.moliya.tushum' : 'nav.moliya.chiqim')}
        variant="mobile-adaptive"
        actions={
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            {t('moliya.newButton')}
          </Button>
        }
      />

      <div className="mb-6 max-w-xs">
        <StatCard
          title={type === 'income' ? t('moliya.kpiTodayIncome') : t('moliya.kpiTodayExpense')}
          value={formatCurrency(todayTotal)}
          icon={type === 'income' ? ArrowDownToLine : ArrowUpFromLine}
          iconColor={type === 'income' ? 'var(--naf-chart-series-4)' : 'var(--naf-danger)'}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <EmptyState
              icon={type === 'income' ? ArrowDownToLine : ArrowUpFromLine}
              title={t('moliya.emptyTitle')}
              description={type === 'income' ? t('moliya.emptyDescriptionIncome') : t('moliya.emptyDescriptionExpense')}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>{t('moliya.colDate')}</TableHead>
                  <TableHead>{t('moliya.colCategory')}</TableHead>
                  <TableHead>{t('moliya.colAccount')}</TableHead>
                  <TableHead className="text-right">{t('moliya.colAmount')}</TableHead>
                  <TableHead>{t('moliya.colContact')}</TableHead>
                  <TableHead>{t('moliya.colNote')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((tx, index) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-[var(--naf-body-fg-muted)]">{index + 1}</TableCell>
                    <TableCell>{format(new Date(tx.date), 'dd.MM.yyyy')}</TableCell>
                    <TableCell className="font-medium">{tx.category}</TableCell>
                    <TableCell className="text-[var(--naf-body-fg-muted)]">{tx.accountName}</TableCell>
                    <TableCell
                      className={
                        'text-right font-semibold ' +
                        (type === 'income' ? 'text-[var(--naf-status-confirmed-fg)]' : 'text-[var(--naf-danger)]')
                      }
                    >
                      {formatCurrency(tx.amount)}
                    </TableCell>
                    <TableCell className="text-[var(--naf-body-fg-muted)]">{tx.contact || '—'}</TableCell>
                    <TableCell className="text-[var(--naf-body-fg-muted)]">{tx.note || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={type} />
    </div>
  );
}

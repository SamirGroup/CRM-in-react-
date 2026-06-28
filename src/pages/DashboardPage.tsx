import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/cn';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { useBranchesStore } from '@/store/useBranchesStore';
import { useCashiersStore } from '@/store/useCashiersStore';
import { useAccountsStore } from '@/store/useAccountsStore';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

const toDateInput = (date: Date) => date.toISOString().slice(0, 10);

export function DashboardPage() {
  const branches = useBranchesStore((s) => s.branches);
  const cashiers = useCashiersStore((s) => s.cashiers);
  const fetchCashiers = useCashiersStore((s) => s.fetchCashiers);
  const accounts = useAccountsStore((s) => s.accounts);
  const fetchAccounts = useAccountsStore((s) => s.fetchAccounts);
  const [branchId, setBranchId] = useState('all');
  const [dateFrom, setDateFrom] = useState(() => toDateInput(new Date()));
  const [dateTo, setDateTo] = useState(() => toDateInput(new Date()));
  const { t } = useTranslation();

  useEffect(() => {
    if (cashiers.length === 0) fetchCashiers();
    if (accounts.length === 0) fetchAccounts();
  }, [cashiers.length, accounts.length, fetchCashiers, fetchAccounts]);

  const DASHBOARD_TABS = [
    { key: 'dashboard', label: t('dashboard.tabs.dashboard'), to: '/dashboard' },
    { key: 'allReports', label: t('dashboard.tabs.allReports'), to: '/hisobot' },
    { key: 'turnover', label: t('dashboard.tabs.turnover'), to: '/hisobot/aylanma' },
    { key: 'finance', label: t('dashboard.tabs.finance'), to: '/hisobot/cashflow' },
  ];

  const applyQuickRange = (range: 'yesterday' | 'today' | 'month') => {
    const now = new Date();
    if (range === 'today') {
      setDateFrom(toDateInput(now));
      setDateTo(toDateInput(now));
    } else if (range === 'yesterday') {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      setDateFrom(toDateInput(yesterday));
      setDateTo(toDateInput(yesterday));
    } else {
      setDateFrom(toDateInput(new Date(now.getFullYear(), now.getMonth(), 1)));
      setDateTo(toDateInput(now));
    }
  };

  const handleFilter = () => {
    toast.success(t('common.updated'));
  };

  return (
    <div>
      <PageHeader title={t('dashboard.title')} variant="mobile-adaptive" />

      {/* In-page tabs */}
      <div className="flex gap-1 border-b border-[var(--naf-border-subtle)] mb-6 overflow-x-auto">
        {DASHBOARD_TABS.map((tab) => (
          <Link
            key={tab.key}
            to={tab.to}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
              tab.key === 'dashboard'
                ? 'border-[var(--naf-accent)] text-[var(--naf-accent)]'
                : 'border-transparent text-[var(--naf-body-fg-muted)] hover:text-[var(--naf-body-fg)]'
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--naf-body-fg-muted)]">{t('dashboard.filters.branch')}</label>
              <Select
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
                options={[
                  { value: 'all', label: t('common.allBranches') },
                  ...branches.map((b) => ({ value: b.id, label: b.name })),
                ]}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--naf-body-fg-muted)]">{t('dashboard.filters.dateFrom')}</label>
              <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--naf-body-fg-muted)]">{t('dashboard.filters.dateTo')}</label>
              <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
            <Button variant="primary" onClick={handleFilter}>
              <Filter className="h-4 w-4" />
              {t('common.filter')}
            </Button>
          </div>
          <div className="flex gap-2 mt-3">
            <button type="button" className="naf-toolbar-chip" onClick={() => applyQuickRange('yesterday')}>
              {t('common.yesterday')}
            </button>
            <button type="button" className="naf-toolbar-chip" onClick={() => applyQuickRange('today')}>
              {t('common.today')}
            </button>
            <button type="button" className="naf-toolbar-chip" onClick={() => applyQuickRange('month')}>
              {t('common.thisMonth')}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Big balance cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[var(--naf-body-fg-muted)] mb-1">{t('dashboard.stockBalance.title')}</p>
              <p className="text-2xl font-bold text-[var(--naf-body-fg)]">{formatCurrency(1179000000)}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast.success(t('common.updated'))}>
              <RefreshCw className="h-4 w-4" />
              {t('common.refresh')}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[var(--naf-body-fg-muted)] mb-1">{t('dashboard.cashBalance.title')}</p>
              <p className="text-2xl font-bold text-[var(--naf-body-fg)]">{formatCurrency(845300000)}</p>
            </div>
            <Button variant="outline" size="icon" onClick={() => toast.success(t('common.updated'))}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Summary cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard
          title={t('dashboard.cards.income.title')}
          to="/hisobot/aylanma"
          accent="accent"
          rows={[
            { label: t('dashboard.cards.income.purchaseSum'), value: formatCurrency(63500000) },
            { label: t('dashboard.cards.income.expectedProfit'), value: formatCurrency(18200000) },
            { label: t('dashboard.cards.income.assortment'), value: `125 ${t('dashboard.cards.income.assortmentValue')}` },
          ]}
        />
        <SummaryCard
          title={t('dashboard.cards.sales.title')}
          to="/sotuv/sotuvlar"
          accent="success"
          rows={[
            { label: t('dashboard.cards.sales.saleSum'), value: formatCurrency(125750000) },
            { label: t('dashboard.cards.sales.grossProfit'), value: formatCurrency(42300000) },
            { label: t('dashboard.cards.sales.countAvgCheck'), value: `1,241 / ${formatCurrency(101000)}` },
          ]}
        />
        <SummaryCard
          title={t('dashboard.cards.incomeFlow.title')}
          to="/hisobot/cashflow"
          accent="accent"
          rows={[{ label: t('common.total'), value: formatCurrency(98400000) }]}
        />
        <SummaryCard
          title={t('dashboard.cards.expenseFlow.title')}
          to="/hisobot/cashflow"
          accent="danger"
          rows={[{ label: t('common.total'), value: formatCurrency(54200000) }]}
        />
        <SummaryCard
          title={t('dashboard.cards.contactDebt.title')}
          to="/kontakt"
          accent="danger"
          rows={[{ label: t('common.total'), value: formatCurrency(12600000) }]}
        />
        <SummaryCard
          title={t('dashboard.cards.contactCredit.title')}
          to="/kontakt"
          accent="success"
          rows={[{ label: t('common.total'), value: formatCurrency(8900000) }]}
        />
        <SummaryCard
          title={t('dashboard.cards.returnIn.title')}
          to="/sotuv/qaytarish"
          accent="accent"
          rows={[{ label: t('common.amount'), value: formatCurrency(3400000) }]}
        />
        <SummaryCard
          title={t('dashboard.cards.returnOut.title')}
          to="/mahsulot/qaytarish"
          accent="accent"
          rows={[{ label: t('common.amount'), value: formatCurrency(2100000) }]}
        />
        <SummaryCard
          title={t('dashboard.cards.writeOff.title')}
          to="/mahsulot/ochirish"
          accent="danger"
          rows={[{ label: t('common.amount'), value: formatCurrency(1050000) }]}
        />
      </div>

      {/* Cashiers table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{t('dashboard.cashiers.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">{t('dashboard.cashiers.colId')}</TableHead>
                <TableHead>{t('dashboard.cashiers.colAccount')}</TableHead>
                <TableHead className="text-right">{t('dashboard.cashiers.colSales')}</TableHead>
                <TableHead className="text-center">{t('dashboard.cashiers.colSalesCount')}</TableHead>
                <TableHead className="text-right">{t('dashboard.cashiers.colAvgCheck')}</TableHead>
                <TableHead className="text-right">{t('dashboard.cashiers.colCreditSales')}</TableHead>
                <TableHead className="text-right">{t('dashboard.cashiers.colDiscount')}</TableHead>
                <TableHead className="text-right">{t('dashboard.cashiers.colReturns')}</TableHead>
                <TableHead className="text-right">{t('dashboard.cashiers.colIncome')}</TableHead>
                <TableHead className="text-right">{t('dashboard.cashiers.colExpense')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashiers.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell className="text-[var(--naf-body-fg-muted)]">{index + 1}</TableCell>
                  <TableCell className="font-medium">{row.account}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.sales)}</TableCell>
                  <TableCell className="text-center">{row.salesCount}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.avgCheck)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.creditSales)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.discount)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.returns)}</TableCell>
                  <TableCell className="text-right text-[var(--naf-status-confirmed-fg)]">{formatCurrency(row.income)}</TableCell>
                  <TableCell className="text-right text-[var(--naf-danger)]">{formatCurrency(row.expense)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Accounts table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{t('dashboard.accounts.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">{t('dashboard.accounts.colNum')}</TableHead>
                <TableHead>{t('dashboard.accounts.colName')}</TableHead>
                <TableHead className="text-right">{t('dashboard.accounts.colBalance')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell className="text-[var(--naf-body-fg-muted)]">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      <span
                        className="naf-icon-chip h-8 w-8 shrink-0"
                        style={{ '--chip-color': row.color } as React.CSSProperties}
                      >
                        <row.icon className="h-4 w-4" />
                      </span>
                      {row.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(row.balance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

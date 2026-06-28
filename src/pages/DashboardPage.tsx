import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/cn';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { useBranchesStore } from '@/store/useBranchesStore';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

const toDateInput = (date: Date) => date.toISOString().slice(0, 10);

export function DashboardPage() {
  const branches = useBranchesStore((s) => s.branches);
  const [branchId, setBranchId] = useState('all');
  const [dateFrom, setDateFrom] = useState(() => toDateInput(new Date()));
  const [dateTo, setDateTo] = useState(() => toDateInput(new Date()));
  const { t } = useTranslation();

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
    </div>
  );
}

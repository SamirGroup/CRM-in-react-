import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Plus, User, TrendingUp, CalendarDays, MessageSquare } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/cn';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';
import { useAccountsStore } from '@/store/useAccountsStore';
import { useMoliyaStore } from '@/store/useMoliyaStore';
import type { MoliyaTransaction } from '@/types';

export interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'income' | 'expense';
}

type ToggleKey = 'contact' | 'rate' | 'date' | 'note';

export function TransactionModal({ isOpen, onClose, type }: TransactionModalProps) {
  const { t } = useTranslation();
  const { accounts, fetchAccounts } = useAccountsStore();
  const { incomeCategories, expenseCategories, addTransaction, addCategory } = useMoliyaStore();
  const categories = type === 'income' ? incomeCategories : expenseCategories;

  const [amount, setAmount] = useState('');
  const [accountId, setAccountId] = useState('');
  const [category, setCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [activeToggles, setActiveToggles] = useState<Set<ToggleKey>>(new Set());
  const [contact, setContact] = useState('');
  const [rate, setRate] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ amount?: string; account?: string; category?: string }>({});

  useEffect(() => {
    if (accounts.length === 0) fetchAccounts();
  }, [accounts.length, fetchAccounts]);

  const reset = () => {
    setAmount('');
    setAccountId('');
    setCategory('');
    setIsAddingCategory(false);
    setNewCategory('');
    setActiveToggles(new Set());
    setContact('');
    setRate('');
    setDate(new Date().toISOString().slice(0, 10));
    setNote('');
    setErrors({});
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const toggleField = (key: ToggleKey) => {
    setActiveToggles((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    addCategory(type, trimmed);
    setCategory(trimmed);
    setNewCategory('');
    setIsAddingCategory(false);
  };

  const handleSave = () => {
    const numAmount = Number(amount);
    const nextErrors: typeof errors = {};
    if (!numAmount || numAmount <= 0) nextErrors.amount = t('moliya.amountRequired');
    if (!accountId) nextErrors.account = t('moliya.accountRequired');
    if (!category) nextErrors.category = t('moliya.categoryRequired');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const account = accounts.find((a) => a.id === accountId);
    const tx: MoliyaTransaction = {
      id: crypto.randomUUID(),
      type,
      amount: numAmount,
      accountId,
      accountName: account?.name ?? '',
      category,
      contact: activeToggles.has('contact') ? contact : undefined,
      rate: activeToggles.has('rate') ? Number(rate) || undefined : undefined,
      date: activeToggles.has('date') ? date : new Date().toISOString().slice(0, 10),
      note: activeToggles.has('note') ? note : undefined,
      created_at: new Date().toISOString(),
    };
    addTransaction(tx);
    toast.success(type === 'income' ? t('moliya.savedIncome') : t('moliya.savedExpense'));
    reset();
    onClose();
  };

  const toggles: { key: ToggleKey; label: string; icon: typeof User }[] = [
    { key: 'contact', label: t('moliya.toggleContact'), icon: User },
    { key: 'rate', label: t('moliya.toggleRate'), icon: TrendingUp },
    { key: 'date', label: t('moliya.toggleDate'), icon: CalendarDays },
    { key: 'note', label: t('moliya.toggleNote'), icon: MessageSquare },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={type === 'income' ? t('moliya.modalTitleIncome') : t('moliya.modalTitleExpense')}
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            {t('moliya.cancel')}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {t('moliya.save')}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tx-amount">{t('moliya.amountLabel')} *</Label>
            <div className="relative">
              <Input
                id="tx-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-14"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--naf-body-fg-muted)]">UZS</span>
            </div>
            {errors.amount && <p className="text-sm text-[var(--naf-danger)]">{errors.amount}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tx-account">{t('moliya.accountLabel')} *</Label>
            <Select
              id="tx-account"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              placeholder={t('moliya.accountPlaceholder')}
              options={accounts.map((a) => ({ value: a.id, label: `${a.name} (Баланс: ${formatCurrency(a.balance)})` }))}
            />
            {errors.account && <p className="text-sm text-[var(--naf-danger)]">{errors.account}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tx-category">
            {type === 'income' ? t('moliya.incomeCategoryLabel') : t('moliya.expenseCategoryLabel')} *
          </Label>
          {isAddingCategory ? (
            <div className="flex gap-2">
              <Input
                autoFocus
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder={t('moliya.addCategoryPlaceholder')}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <Button variant="primary" onClick={handleAddCategory}>
                {t('moliya.addCategoryConfirm')}
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Select
                id="tx-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder={t('moliya.categoryPlaceholder')}
                options={categories.map((c) => ({ value: c, label: c }))}
              />
              <Button variant="outline" size="icon" onClick={() => setIsAddingCategory(true)} title={t('moliya.addCategoryConfirm')}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
          {errors.category && <p className="text-sm text-[var(--naf-danger)]">{errors.category}</p>}
        </div>

        <div className="flex flex-wrap gap-2">
          {toggles.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleField(key)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors',
                activeToggles.has(key)
                  ? 'border-[var(--naf-accent)] bg-[var(--naf-accent-soft)] text-[var(--naf-accent)]'
                  : 'border-[var(--naf-border-subtle)] text-[var(--naf-body-fg-muted)] hover:text-[var(--naf-body-fg)]'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {activeToggles.has('contact') && (
          <div className="space-y-2">
            <Label htmlFor="tx-contact">{t('moliya.toggleContact')}</Label>
            <Input id="tx-contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder={t('moliya.contactPlaceholder')} />
          </div>
        )}
        {activeToggles.has('rate') && (
          <div className="space-y-2">
            <Label htmlFor="tx-rate">{t('moliya.toggleRate')}</Label>
            <Input id="tx-rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder={t('moliya.ratePlaceholder')} />
          </div>
        )}
        {activeToggles.has('date') && (
          <div className="space-y-2">
            <Label htmlFor="tx-date">{t('moliya.toggleDate')}</Label>
            <Input id="tx-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        )}
        {activeToggles.has('note') && (
          <div className="space-y-2">
            <Label htmlFor="tx-note">{t('moliya.toggleNote')}</Label>
            <textarea
              id="tx-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('moliya.notePlaceholder')}
              rows={3}
              className="flex w-full rounded-lg border border-[var(--naf-border-subtle)] bg-[var(--naf-raised-bg)] px-3 py-2 text-sm text-[var(--naf-body-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--naf-accent)] focus-visible:border-transparent transition-colors"
            />
          </div>
        )}
      </div>
    </Modal>
  );
}

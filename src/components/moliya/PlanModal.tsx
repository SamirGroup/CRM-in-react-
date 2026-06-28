import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, MessageSquare } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/cn';
import { useTranslation } from '@/hooks/useTranslation';
import { useMoliyaStore } from '@/store/useMoliyaStore';
import type { MoliyaPlan } from '@/types';

export interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'income' | 'expense';
}

export function PlanModal({ isOpen, onClose, type }: PlanModalProps) {
  const { t } = useTranslation();
  const { incomeCategories, expenseCategories, addPlan, addCategory } = useMoliyaStore();
  const categories = type === 'income' ? incomeCategories : expenseCategories;

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [period, setPeriod] = useState(() => new Date().toISOString().slice(0, 7));
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ amount?: string; category?: string }>({});

  const reset = () => {
    setAmount('');
    setCategory('');
    setIsAddingCategory(false);
    setNewCategory('');
    setPeriod(new Date().toISOString().slice(0, 7));
    setIsNoteOpen(false);
    setNote('');
    setErrors({});
  };

  const handleClose = () => {
    reset();
    onClose();
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
    if (!category) nextErrors.category = t('moliya.categoryRequired');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const plan: MoliyaPlan = {
      id: crypto.randomUUID(),
      type,
      amount: numAmount,
      category,
      period,
      note: isNoteOpen ? note : undefined,
      created_at: new Date().toISOString(),
    };
    addPlan(plan);
    toast.success(type === 'income' ? t('moliya.savedIncomePlan') : t('moliya.savedExpensePlan'));
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={type === 'income' ? t('moliya.planModalTitleIncome') : t('moliya.planModalTitleExpense')}
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
            <Label htmlFor="plan-amount">{t('moliya.amountLabel')} *</Label>
            <div className="relative">
              <Input
                id="plan-amount"
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
            <Label htmlFor="plan-period">{t('moliya.periodLabel')} *</Label>
            <Input id="plan-period" type="month" value={period} onChange={(e) => setPeriod(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="plan-category">
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
                id="plan-category"
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

        <button
          type="button"
          onClick={() => setIsNoteOpen((v) => !v)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors',
            isNoteOpen
              ? 'border-[var(--naf-accent)] bg-[var(--naf-accent-soft)] text-[var(--naf-accent)]'
              : 'border-[var(--naf-border-subtle)] text-[var(--naf-body-fg-muted)] hover:text-[var(--naf-body-fg)]'
          )}
        >
          <MessageSquare className="h-4 w-4" />
          {t('moliya.toggleNote')}
        </button>

        {isNoteOpen && (
          <div className="space-y-2">
            <Label htmlFor="plan-note">{t('moliya.toggleNote')}</Label>
            <textarea
              id="plan-note"
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

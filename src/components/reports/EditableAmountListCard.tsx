import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { EditableNumberCell } from '@/components/reports/EditableNumberCell';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';
import type { CashFlowItem } from '@/store/useCashFlowDetailStore';

export interface EditableAmountListCardProps {
  title: string;
  items: CashFlowItem[];
  onUpdate: (id: string, amount: number) => void;
  onSaved: () => void;
  accent: 'success' | 'danger';
}

export function EditableAmountListCard({ title, items, onUpdate, onSaved, accent }: EditableAmountListCardProps) {
  const { t } = useTranslation();
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const accentColor = accent === 'success' ? 'var(--naf-status-confirmed-fg)' : 'var(--naf-danger)';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 py-1.5 border-b border-[var(--naf-border-subtle)] last:border-0">
              <span className="text-sm text-[var(--naf-body-fg)]">{item.name}</span>
              <EditableNumberCell
                value={item.amount}
                onCommit={(v) => onUpdate(item.id, v)}
                onSaved={onSaved}
                className="w-32"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-[var(--naf-border-subtle)]">
          <span className="text-sm font-semibold text-[var(--naf-body-fg)]">{t('common.total')}</span>
          <span className="text-sm font-bold" style={{ color: accentColor }}>{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

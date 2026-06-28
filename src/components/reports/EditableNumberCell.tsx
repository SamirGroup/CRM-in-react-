import { cn } from '@/lib/cn';

export interface EditableNumberCellProps {
  value: number;
  onCommit: (value: number) => void;
  onSaved?: () => void;
  className?: string;
}

export function EditableNumberCell({ value, onCommit, onSaved, className }: EditableNumberCellProps) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onCommit(Number(e.target.value) || 0)}
      onBlur={() => onSaved?.()}
      className={cn(
        'w-28 rounded-md border border-transparent bg-transparent px-2 py-1 text-right text-sm tabular-nums',
        'hover:border-[var(--naf-border-subtle)] focus:border-[var(--naf-accent)] focus:bg-[var(--naf-float-bg)] focus:outline-none',
        'transition-colors',
        className
      )}
    />
  );
}

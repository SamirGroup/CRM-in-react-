import { format } from 'date-fns';
import { uz } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { cn } from '@/lib/cn';
import { Button } from './Button';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  className?: string;
}

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (range: DateRange | undefined) => {
    if (range) {
      onChange?.(range);
    }
  };

  const displayValue = value?.from
    ? value.to
      ? `${format(value.from, 'dd MMM yyyy', { locale: uz })} - ${format(value.to, 'dd MMM yyyy', { locale: uz })}`
      : format(value.from, 'dd MMM yyyy', { locale: uz })
    : 'Sanani tanlang';

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="outline"
        className={cn('justify-start text-left font-normal', !value && 'text-[var(--naf-body-fg-muted)]')}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {displayValue}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute z-50 mt-2 p-4 naf-surface-raised rounded-lg shadow-lg">
            <DayPicker
              locale={uz}
              mode="range"
              selected={value}
              onSelect={(range) => {
                handleSelect(range as DateRange);
                setIsOpen(false);
              }}
              numberOfMonths={2}
              classNames={{
                months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'space-y-4',
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(
                  'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                ),
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell: 'text-[var(--naf-body-fg-muted)] rounded-md w-9 font-normal text-[0.8rem]',
                row: 'flex w-full mt-2',
                cell: cn(
                  'h-9 w-9 text-center text-sm p-0 relative',
                  '[&:has([aria-selected].day-range-end)]:rounded-r-md',
                  '[&:has([aria-selected].day-outside)]:bg-[var(--naf-accent-soft)]',
                  '[&:has([aria-selected])]:bg-[var(--naf-accent)]',
                  'first:[&:has([aria-selected])]:rounded-l-md',
                  'last:[&:has([aria-selected])]:rounded-r-md',
                  'focus-within:relative focus-within:z-20'
                ),
                day: cn(
                  'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
                ),
                day_range_end: 'day-range-end',
                day_selected: cn(
                  'bg-[var(--naf-accent)] text-white hover:bg-[var(--naf-accent-hover)]'
                ),
                day_today: 'bg-[var(--naf-chrome-bg)] text-[var(--naf-body-fg)]',
                day_outside: 'day-outside text-[var(--naf-body-fg-faint)] opacity-50',
                day_disabled: 'text-[var(--naf-body-fg-faint)] opacity-50',
                day_range_middle: 'aria-selected:bg-[var(--naf-accent-soft)] aria-selected:text-[var(--naf-accent)]',
                day_hidden: 'invisible',
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

import { format } from 'date-fns';
import { uz } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from './Button';
import { useState } from 'react';

const MONTHS = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
];

export interface MonthPickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

export function MonthPicker({ value, onChange, className }: MonthPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value?.getFullYear() || new Date().getFullYear());

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(viewYear, monthIndex, 1);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const handleYearChange = (delta: number) => {
    setViewYear(viewYear + delta);
  };

  const displayValue = value
    ? format(value, 'MMMM yyyy', { locale: uz })
    : 'Oyni tanlang';

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
          <div className="absolute z-50 mt-2 p-4 naf-surface-raised rounded-lg shadow-lg w-64">
            {/* Year Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={() => handleYearChange(-1)}>
                ‹
              </Button>
              <span className="font-semibold">{viewYear}</span>
              <Button variant="ghost" size="icon" onClick={() => handleYearChange(1)}>
                ›
              </Button>
            </div>

            {/* Months Grid */}
            <div className="grid grid-cols-3 gap-2">
              {MONTHS.map((month, index) => (
                <Button
                  key={month}
                  variant={value?.getMonth() === index && value?.getFullYear() === viewYear ? 'primary' : 'ghost'}
                  size="sm"
                  className="text-xs"
                  onClick={() => handleMonthSelect(index)}
                >
                  {month.slice(0, 3)}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

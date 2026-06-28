import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Input } from './Input';
import { Button } from './Button';
import { Skeleton } from './Skeleton';

export interface ProductOption {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

export interface ProductSearchComboboxProps {
  value?: ProductOption;
  onChange?: (product: ProductOption | null) => void;
  onSearch?: (query: string) => Promise<ProductOption[]>;
  placeholder?: string;
  className?: string;
}

export function ProductSearchCombobox({
  value,
  onChange,
  onSearch,
  placeholder = 'Mahsulotni qidirish...',
  className,
}: ProductSearchComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<ProductOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2 && onSearch) {
        setIsLoading(true);
        try {
          const results = await onSearch(query);
          setOptions(results);
          setIsOpen(true);
          setHighlightedIndex(-1);
        } finally {
          setIsLoading(false);
        }
      } else {
        setOptions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleSelect = (product: ProductOption) => {
    onChange?.(product);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onChange?.(null);
    setQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && options[highlightedIndex]) {
          handleSelect(options[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const element = listRef.current.children[highlightedIndex] as HTMLElement;
      element?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--naf-body-fg-muted)]" />
        <Input
          ref={inputRef}
          value={value ? `${value.name} (${value.sku})` : query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!value) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10"
          readOnly={!!value}
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (query.length >= 2 || isLoading) && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <ul
            ref={listRef}
            className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto naf-surface-raised rounded-lg shadow-lg"
          >
            {isLoading ? (
              <li className="p-3">
                <Skeleton className="h-8 w-full" />
              </li>
            ) : options.length === 0 ? (
              <li className="p-3 text-sm text-[var(--naf-body-fg-muted)]">
                Mahsulot topilmadi
              </li>
            ) : (
              options.map((product, index) => (
                <li
                  key={product.id}
                  className={cn(
                    'px-3 py-2 cursor-pointer transition-colors',
                    index === highlightedIndex ? 'bg-[var(--naf-accent-soft)]' : 'hover:bg-[var(--naf-chrome-bg)]'
                  )}
                  onClick={() => handleSelect(product)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-[var(--naf-body-fg-muted)]">{product.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        {new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', minimumFractionDigits: 0 }).format(product.price)}
                      </p>
                      <p className={cn('text-xs', product.quantity > 0 ? 'text-[var(--naf-badge-success-fg)]' : 'text-[var(--naf-badge-danger-fg)]')}>
                        {product.quantity} dona
                      </p>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
}

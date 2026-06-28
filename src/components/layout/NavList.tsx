import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { NAV_ITEMS } from '@/lib/constants';
import { NavIcon } from '@/components/icons/NavIcon';
import { useTranslation } from '@/hooks/useTranslation';

export interface NavListProps {
  onNavigate?: () => void;
  className?: string;
}

export function NavList({ onNavigate, className }: NavListProps) {
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const isParentActive = (entry: (typeof NAV_ITEMS)[number]) =>
    entry.to ? isActive(entry.to) : (entry.children?.some((c) => isActive(c.to)) ?? false);

  const [openLabel, setOpenLabel] = useState<string | null>(
    () => NAV_ITEMS.find((entry) => entry.children && isParentActive(entry))?.labelKey ?? null
  );

  return (
    <nav className={cn('space-y-1', className)}>
      {NAV_ITEMS.map((entry) => {
        const active = isParentActive(entry);

        if (!entry.children) {
          return (
            <Link
              key={entry.labelKey}
              to={entry.to!}
              onClick={onNavigate}
              className={cn(
                'relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-[var(--naf-accent-soft)] text-[var(--naf-accent)]'
                  : 'text-[var(--naf-body-fg)] hover:bg-[var(--naf-raised-bg)]'
              )}
            >
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-[var(--naf-accent)]" />
              )}
              <NavIcon name={entry.icon} />
              {t(entry.labelKey)}
            </Link>
          );
        }

        const isOpen = openLabel === entry.labelKey;

        return (
          <div key={entry.labelKey}>
            <button
              type="button"
              onClick={() => setOpenLabel(isOpen ? null : entry.labelKey)}
              className={cn(
                'relative flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-[var(--naf-accent-soft)] text-[var(--naf-accent)]'
                  : 'text-[var(--naf-body-fg)] hover:bg-[var(--naf-raised-bg)]'
              )}
            >
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-[var(--naf-accent)]" />
              )}
              <NavIcon name={entry.icon} />
              <span className="flex-1 text-left">{t(entry.labelKey)}</span>
              <ChevronDown
                className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
              />
            </button>
            {isOpen && (
              <ul className="mt-1 ml-4 space-y-1 border-l border-[var(--naf-border-subtle)] pl-4">
                {entry.children.map((child) => {
                  const childActive = isActive(child.to);
                  return (
                    <li key={child.to}>
                      <Link
                        to={child.to}
                        onClick={onNavigate}
                        className={cn(
                          'block px-3 py-1.5 rounded-md text-sm transition-colors',
                          childActive
                            ? 'text-[var(--naf-accent)] font-medium'
                            : 'text-[var(--naf-body-fg-muted)] hover:text-[var(--naf-body-fg)]'
                        )}
                      >
                        {t(child.labelKey)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}

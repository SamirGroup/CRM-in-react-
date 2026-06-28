import { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TopbarUserMenu } from './TopbarUserMenu';
import { useUIStore } from '@/store/useUIStore';
import { useTranslation } from '@/hooks/useTranslation';

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleMobileNav } = useUIStore();
  const { t } = useTranslation();

  const handleMenuClick = () => {
    toggleMobileNav();
    onMenuClick?.();
  };

  return (
    <header
      className={cn(
        'fixed right-0 top-0 z-20 h-16 bg-[var(--naf-raised-bg)] border-b border-[var(--naf-border-subtle)] shadow-[var(--naf-panel-shadow)]',
        'flex items-center justify-between px-4',
        'md:left-56 md:px-6',
        'left-0'
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={handleMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="hidden md:block relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--naf-body-fg-muted)]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('common.search')}
            className="pl-10 pr-12"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md border border-[var(--naf-border-subtle)] bg-[var(--naf-chrome-bg)] px-1.5 py-0.5 text-[11px] font-medium text-[var(--naf-body-fg-muted)]">
            Ctrl+K
          </kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[var(--naf-danger)]" />
        </Button>

        {/* User Menu */}
        <TopbarUserMenu />
      </div>
    </header>
  );
}

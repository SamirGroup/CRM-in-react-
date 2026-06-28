import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';

export function TopbarUserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar
          src={user?.avatar_url}
          fallback={user?.name?.charAt(0)}
          size="sm"
        />
        <span className="hidden md:block text-sm font-medium">
          {user?.name}
        </span>
        <ChevronDown className="h-4 w-4 text-[var(--naf-body-fg-muted)]" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 naf-surface-raised rounded-lg shadow-lg z-50 overflow-hidden">
            {/* User Info */}
            <div className="p-4 border-b border-[var(--naf-border-subtle)]">
              <p className="font-medium text-[var(--naf-body-fg)]">
                {user?.name}
              </p>
              <p className="text-sm text-[var(--naf-body-fg-muted)]">
                {user?.email}
              </p>
              <p className="text-xs text-[var(--naf-accent)] mt-1 capitalize">
                {user?.role}
              </p>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link
                to="/sozlama/umumiy"
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                  'text-[var(--naf-body-fg)] hover:bg-[var(--naf-chrome-bg)]'
                )}
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4" />
                {t('common.settings')}
              </Link>
              <Link
                to="/sozlama/akkauntlar"
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                  'text-[var(--naf-body-fg)] hover:bg-[var(--naf-chrome-bg)]'
                )}
                onClick={() => setIsOpen(false)}
              >
                <User className="h-4 w-4" />
                {t('common.profile')}
              </Link>
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-[var(--naf-border-subtle)]">
              <Button
                variant="ghost"
                className="w-full justify-start text-[var(--naf-danger)] hover:text-[var(--naf-danger-hover)] hover:bg-[var(--naf-badge-danger-bg)]"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                {t('common.logout')}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

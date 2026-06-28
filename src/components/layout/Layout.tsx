import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileDrawerNav } from './MobileDrawerNav';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileNavFab } from './MobileNavFab';
import { useBranchesBootstrap } from '@/hooks/useBranchesBootstrap';

interface LayoutProps {
  className?: string;
}

export function Layout({ className }: LayoutProps) {
  // Filiallar ma'lumotlarini oldindan yuklash
  useBranchesBootstrap();

  return (
    <div className={cn('min-h-dvh bg-[var(--naf-page-bg)]', className)}>
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main
        className={cn(
          'pt-16 pb-16 md:pb-6',
          'px-4 md:px-6',
          'md:pl-56'
        )}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileDrawerNav />
      <MobileBottomNav />
      <MobileNavFab />
    </div>
  );
}

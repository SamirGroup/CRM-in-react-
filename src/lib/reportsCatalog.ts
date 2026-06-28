import {
  LayoutDashboard,
  Scale,
  Banknote,
  Target,
  Repeat,
  Boxes,
  PackageX,
  Gauge,
  ListOrdered,
  type LucideIcon,
} from 'lucide-react';

export type ReportAccent = 'accent' | 'success' | 'warning' | 'danger';

export interface ReportEntry {
  slug: string;
  to: string;
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  accent: ReportAccent;
}

export const REPORTS_CATALOG: ReportEntry[] = [
  {
    slug: 'dashboard',
    to: '/dashboard',
    titleKey: 'reports.dashboard.title',
    descriptionKey: 'reports.dashboard.description',
    icon: LayoutDashboard,
    accent: 'accent',
  },
  {
    slug: 'pnl',
    to: '/hisobot/pnl',
    titleKey: 'reports.pnl.title',
    descriptionKey: 'reports.pnl.description',
    icon: Scale,
    accent: 'success',
  },
  {
    slug: 'cashflow',
    to: '/hisobot/cashflow',
    titleKey: 'reports.cashflow.title',
    descriptionKey: 'reports.cashflow.description',
    icon: Banknote,
    accent: 'accent',
  },
  {
    slug: 'cashflow-plan',
    to: '/hisobot/cashflow-plan',
    titleKey: 'reports.cashflowplan.title',
    descriptionKey: 'reports.cashflowplan.description',
    icon: Target,
    accent: 'accent',
  },
  {
    slug: 'aylanma',
    to: '/hisobot/aylanma',
    titleKey: 'reports.turnover.title',
    descriptionKey: 'reports.turnover.description',
    icon: Repeat,
    accent: 'success',
  },
  {
    slug: 'zaxira',
    to: '/hisobot/zaxira',
    titleKey: 'reports.stock.title',
    descriptionKey: 'reports.stock.description',
    icon: Boxes,
    accent: 'accent',
  },
  {
    slug: 'sotilmagan',
    to: '/hisobot/sotilmagan',
    titleKey: 'reports.deadstock.title',
    descriptionKey: 'reports.deadstock.description',
    icon: PackageX,
    accent: 'warning',
  },
  {
    slug: 'oosnos',
    to: '/hisobot/oosnos',
    titleKey: 'reports.oosnos.title',
    descriptionKey: 'reports.oosnos.description',
    icon: Gauge,
    accent: 'warning',
  },
  {
    slug: 'abc-mahsulot',
    to: '/hisobot/abc-mahsulot',
    titleKey: 'reports.abcProducts.title',
    descriptionKey: 'reports.abcProducts.description',
    icon: ListOrdered,
    accent: 'danger',
  },
  {
    slug: 'abc-bolim',
    to: '/hisobot/abc-bolim',
    titleKey: 'reports.abcCategories.title',
    descriptionKey: 'reports.abcCategories.description',
    icon: ListOrdered,
    accent: 'success',
  },
  {
    slug: 'abc-brend',
    to: '/hisobot/abc-brend',
    titleKey: 'reports.abcBrands.title',
    descriptionKey: 'reports.abcBrands.description',
    icon: ListOrdered,
    accent: 'accent',
  },
];

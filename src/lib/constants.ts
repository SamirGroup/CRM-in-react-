// ═══════════════════════════════════════════════════════════════════════════
// CONDOR CRM — NAVIGATSIYA KONSTANTALARI
// ═══════════════════════════════════════════════════════════════════════════
import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  FileBarChart,
  Wallet,
  ShoppingCart,
  Package,
  Users,
  Settings,
  Sun,
  Moon,
  Building2,
} from 'lucide-react';

export interface NavLeaf {
  to: string;
  labelKey: string;
}

export interface NavEntry {
  labelKey: string;
  icon: string;
  to?: string;
  children?: NavLeaf[];
}

export const NAV_ITEMS: NavEntry[] = [
  { to: '/dashboard', labelKey: 'nav.dashboard', icon: 'dashboard' },
  { to: '/hisobot', labelKey: 'nav.hisobot', icon: 'report' },
  {
    labelKey: 'nav.moliya',
    icon: 'wallet',
    children: [
      { to: '/moliya/tushum', labelKey: 'nav.moliya.tushum' },
      { to: '/moliya/chiqim', labelKey: 'nav.moliya.chiqim' },
      { to: '/moliya/tushum-reja', labelKey: 'nav.moliya.tushumReja' },
      { to: '/moliya/chiqim-reja', labelKey: 'nav.moliya.chiqimReja' },
      { to: '/moliya/hisob', labelKey: 'nav.moliya.hisob' },
    ],
  },
  {
    labelKey: 'nav.sotuv',
    icon: 'shopping-cart',
    children: [
      { to: '/sotuv/sotuvlar', labelKey: 'nav.sotuv.sotuv' },
      { to: '/sotuv/qaytarish', labelKey: 'nav.sotuv.qaytarish' },
    ],
  },
  {
    labelKey: 'nav.mahsulot',
    icon: 'package',
    children: [
      { to: '/mahsulot/royxat', labelKey: 'nav.mahsulot.royxat' },
      { to: '/mahsulot/kirim', labelKey: 'nav.mahsulot.kirim' },
      { to: '/mahsulot/qaytarish', labelKey: 'nav.mahsulot.qaytarish' },
      { to: '/mahsulot/qoldiq-tuzatish', labelKey: 'nav.mahsulot.qoldiqTuzatish' },
      { to: '/mahsulot/narxlash', labelKey: 'nav.mahsulot.narxlash' },
      { to: '/mahsulot/ochirish', labelKey: 'nav.mahsulot.ochirish' },
    ],
  },
  {
    labelKey: 'nav.filiallar',
    icon: 'building',
    children: [
      { to: '/filiallar/qoshish', labelKey: 'nav.filiallar.qoshish' },
      { to: '/filiallar/boshqaruvi', labelKey: 'nav.filiallar.boshqaruvi' },
      { to: '/filiallar/buxgalteriya', labelKey: 'nav.filiallar.buxgalteriyasi' },
      { to: '/filiallar/kunlik-savdo', labelKey: 'nav.filiallar.kunlikSavdosi' },
      { to: '/filiallar/aylanma', labelKey: 'nav.filiallar.aylanma' },
      { to: '/filiallar/kirim', labelKey: 'nav.filiallar.kirim' },
      { to: '/filiallar/chiqim', labelKey: 'nav.filiallar.chiqim' },
      { to: '/filiallar/sotish', labelKey: 'nav.filiallar.sotish' },
    ],
  },
  { to: '/kontakt', labelKey: 'nav.kontakt', icon: 'users' },
  {
    labelKey: 'nav.sozlama',
    icon: 'settings',
    children: [
      { to: '/sozlama/akkauntlar', labelKey: 'nav.sozlama.akkauntlar' },
      { to: '/sozlama/dastur', labelKey: 'nav.sozlama.dastur' },
      { to: '/sozlama/umumiy', labelKey: 'nav.sozlama.umumiy' },
    ],
  },
];

export const ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  report: FileBarChart,
  wallet: Wallet,
  'shopping-cart': ShoppingCart,
  package: Package,
  users: Users,
  settings: Settings,
  sun: Sun,
  moon: Moon,
  building: Building2,
};

export const ROLE_PERMISSIONS = {
  admin: ['all'],
  manager: ['dashboard', 'inventory', 'sales', 'returns', 'products', 'clients', 'reports'],
  seller: ['dashboard', 'sales', 'products'],
} as const;

export const DATE_FORMATS = {
  display: 'dd.MM.yyyy',
  displayWithTime: 'dd.MM.yyyy HH:mm',
  input: 'yyyy-MM-dd',
  api: 'yyyy-MM-dd',
} as const;

export const CURRENCY_FORMAT = new Intl.NumberFormat('uz-UZ', {
  style: 'currency',
  currency: 'UZS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const STATUS_COLORS = {
  pending: 'warning',
  confirmed: 'success',
  rejected: 'danger',
} as const;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import {
  Wallet,
  RotateCcw,
  PackagePlus,
  PackageMinus,
  SlidersHorizontal,
  Tag,
  Trash2,
  Users,
  Building2,
  UserCircle,
  Settings2,
  Calculator,
  ShoppingBag,
  Repeat,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { InventoryPage } from '@/pages/InventoryPage';
import { SalesPage } from '@/pages/SalesPage';
import { HisobotPage } from '@/pages/HisobotPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { GeneralSettingsPage } from '@/pages/GeneralSettingsPage';
import { FilialQoshishPage } from '@/pages/FilialQoshishPage';
import { TushumPage } from '@/pages/moliya/TushumPage';
import { ChiqimPage } from '@/pages/moliya/ChiqimPage';
import { TushumRejaPage } from '@/pages/moliya/TushumRejaPage';
import { ChiqimRejaPage } from '@/pages/moliya/ChiqimRejaPage';
import { PnLReportPage } from '@/pages/reports/PnLReportPage';
import { CashFlowReportPage } from '@/pages/reports/CashFlowReportPage';
import { CashFlowPlanReportPage } from '@/pages/reports/CashFlowPlanReportPage';
import { ProductTurnoverReportPage } from '@/pages/reports/ProductTurnoverReportPage';
import { StockReportPage } from '@/pages/reports/StockReportPage';
import { DeadStockReportPage } from '@/pages/reports/DeadStockReportPage';
import { StockBalanceReportPage } from '@/pages/reports/StockBalanceReportPage';
import { AbcProductsPage } from '@/pages/reports/AbcProductsPage';
import { AbcCategoriesPage } from '@/pages/reports/AbcCategoriesPage';
import { AbcBrandsPage } from '@/pages/reports/AbcBrandsPage';
import { useAuthStore } from '@/store/useAuthStore';

// Auth himoya komponenti
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      storageKey="crm-theme"
    >
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />

            {/* Хисобот */}
            <Route path="hisobot" element={<HisobotPage />} />
            <Route path="hisobot/pnl" element={<PnLReportPage />} />
            <Route path="hisobot/cashflow" element={<CashFlowReportPage />} />
            <Route path="hisobot/cashflow-plan" element={<CashFlowPlanReportPage />} />
            <Route path="hisobot/aylanma" element={<ProductTurnoverReportPage />} />
            <Route path="hisobot/zaxira" element={<StockReportPage />} />
            <Route path="hisobot/sotilmagan" element={<DeadStockReportPage />} />
            <Route path="hisobot/oosnos" element={<StockBalanceReportPage />} />
            <Route path="hisobot/abc-mahsulot" element={<AbcProductsPage />} />
            <Route path="hisobot/abc-bolim" element={<AbcCategoriesPage />} />
            <Route path="hisobot/abc-brend" element={<AbcBrandsPage />} />

            {/* Маблағ */}
            <Route path="moliya/tushum" element={<TushumPage />} />
            <Route path="moliya/chiqim" element={<ChiqimPage />} />
            <Route path="moliya/tushum-reja" element={<TushumRejaPage />} />
            <Route path="moliya/chiqim-reja" element={<ChiqimRejaPage />} />
            <Route path="moliya/hisob" element={<PlaceholderPage titleKey="pages.hisob" icon={Wallet} />} />

            {/* Сотув */}
            <Route path="sotuv/sotuvlar" element={<SalesPage />} />
            <Route path="sotuv/qaytarish" element={<PlaceholderPage titleKey="pages.sotuvQaytarish" icon={RotateCcw} />} />

            {/* Маҳсулот */}
            <Route path="mahsulot/royxat" element={<InventoryPage />} />
            <Route path="mahsulot/kirim" element={<PlaceholderPage titleKey="pages.mahsulotKirim" icon={PackagePlus} />} />
            <Route path="mahsulot/qaytarish" element={<PlaceholderPage titleKey="pages.mahsulotQaytarish" icon={PackageMinus} />} />
            <Route path="mahsulot/qoldiq-tuzatish" element={<PlaceholderPage titleKey="pages.qoldiqTuzatish" icon={SlidersHorizontal} />} />
            <Route path="mahsulot/narxlash" element={<PlaceholderPage titleKey="pages.narxlash" icon={Tag} />} />
            <Route path="mahsulot/ochirish" element={<PlaceholderPage titleKey="pages.royxatdanOchirish" icon={Trash2} />} />

            {/* Филиаллар */}
            <Route path="filiallar/qoshish" element={<FilialQoshishPage />} />
            <Route path="filiallar/boshqaruvi" element={<PlaceholderPage titleKey="pages.filiallarBoshqaruvi" icon={Building2} />} />
            <Route path="filiallar/buxgalteriya" element={<PlaceholderPage titleKey="pages.filiallarBuxgalteriyasi" icon={Calculator} />} />
            <Route path="filiallar/kunlik-savdo" element={<PlaceholderPage titleKey="pages.filiallarKunlikSavdosi" icon={ShoppingBag} />} />
            <Route path="filiallar/aylanma" element={<PlaceholderPage titleKey="pages.filiallarAylanma" icon={Repeat} />} />
            <Route path="filiallar/kirim" element={<PlaceholderPage titleKey="pages.filiallarKirim" icon={PackagePlus} />} />
            <Route path="filiallar/chiqim" element={<PlaceholderPage titleKey="pages.filiallarChiqim" icon={PackageMinus} />} />
            <Route path="filiallar/sotish" element={<PlaceholderPage titleKey="pages.filiallarSotish" icon={ShoppingBag} />} />

            <Route path="kontakt" element={<PlaceholderPage titleKey="pages.kontakt" icon={Users} />} />

            {/* Созлама */}
            <Route path="sozlama/akkauntlar" element={<PlaceholderPage titleKey="pages.akkauntlar" icon={UserCircle} />} />
            <Route path="sozlama/dastur" element={<PlaceholderPage titleKey="pages.dasturSozlamalari" icon={Settings2} />} />
            <Route path="sozlama/umumiy" element={<GeneralSettingsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--naf-float-bg)',
            color: 'var(--naf-body-fg)',
            border: '1px solid var(--naf-border-subtle)',
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;

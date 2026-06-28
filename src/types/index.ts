// ═══════════════════════════════════════════════════════════════════════════
// CONDOR CRM — UMUMIY TURLAR
// ═══════════════════════════════════════════════════════════════════════════

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'seller';
  avatar_url?: string;
  panel_permissions?: string[];
  branch_id?: string;
  created_at: string;
}

export interface WorkerStat {
  id: string;
  name: string;
  sales_count: number;
  sales_amount: number;
  returns_count: number;
  avatar_url?: string;
}

export interface Branch {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
  directorName?: string;
  directorPhone?: string;
  inn?: string;
  bankAccount?: string;
  mfo?: string;
  vatCode?: string;
  agent?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  cost?: number;
  quantity: number;
  min_quantity?: number;
  category_id?: string;
  branch_id: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  parent_id?: string;
  created_at: string;
}

export interface Sale {
  id: string;
  invoice_number: string;
  customer_name?: string;
  customer_phone?: string;
  total_amount: number;
  discount?: number;
  status: 'pending' | 'confirmed' | 'rejected';
  payment_method: 'cash' | 'card' | 'click' | 'payme';
  items: SaleItem[];
  seller_id: string;
  seller_name: string;
  branch_id: string;
  created_at: string;
}

export interface SaleItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  discount?: number;
  total: number;
}

export interface Return {
  id: string;
  sale_id: string;
  invoice_number: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'rejected';
  items: ReturnItem[];
  total_amount: number;
  created_at: string;
}

export interface ReturnItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface DashboardStats {
  total_sales: number;
  total_revenue: number;
  total_returns: number;
  total_products: number;
  active_workers: number;
  sales_trend: TrendData[];
  revenue_trend: TrendData[];
  top_products: ProductStat[];
  worker_stats: WorkerStat[];
}

export interface TrendData {
  date: string;
  value: number;
}

export interface ProductStat {
  id: string;
  name: string;
  quantity_sold: number;
  revenue: number;
}

export interface InventoryStats {
  total_products: number;
  total_value: number;
  low_stock_count: number;
  out_of_stock_count: number;
  categories: CategoryStat[];
  abc_analysis: ABCItem[];
}

export interface CategoryStat {
  id: string;
  name: string;
  product_count: number;
  total_value: number;
}

export interface ABCItem {
  product_id: string;
  product_name: string;
  category: 'A' | 'B' | 'C';
  revenue_percent: number;
  quantity_sold: number;
}

export interface ReportFilter {
  date_from: string;
  date_to: string;
  branch_id?: string;
  category_id?: string;
  seller_id?: string;
}

export interface KPICard {
  title: string;
  value: string | number;
  change?: number;
  change_type?: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

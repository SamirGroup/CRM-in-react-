import { useState } from 'react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/cn';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  Package,
  AlertTriangle,
  Pencil,
  Printer,
  Pause,
  Play,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  unit: string;
  quantity: number;
  minQuantity: number;
  costPrice: number;
  sellPrice: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lifecycle: 'active' | 'inactive' | 'deleted';
}

const initialProducts: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', sku: 'IPH-15-PRO', category: 'Telefonlar', brand: 'Apple', unit: 'та', quantity: 45, minQuantity: 10, costPrice: 13200000, sellPrice: 15000000, status: 'in_stock', lifecycle: 'active' },
  { id: '2', name: 'Samsung S24 Ultra', sku: 'SAM-S24-U', category: 'Telefonlar', brand: 'Samsung', unit: 'та', quantity: 8, minQuantity: 10, costPrice: 12300000, sellPrice: 14000000, status: 'low_stock', lifecycle: 'active' },
  { id: '3', name: 'MacBook Air M3', sku: 'MBA-M3', category: 'Noutbuklar', brand: 'Apple', unit: 'та', quantity: 22, minQuantity: 5, costPrice: 11000000, sellPrice: 12500000, status: 'in_stock', lifecycle: 'active' },
  { id: '4', name: 'AirPods Pro 2', sku: 'APP-2', category: 'Quloqchinlar', brand: 'Apple', unit: 'та', quantity: 0, minQuantity: 15, costPrice: 2600000, sellPrice: 3000000, status: 'out_of_stock', lifecycle: 'active' },
  { id: '5', name: 'iPad Air 5', sku: 'IPA-5', category: 'Planshetlar', brand: 'Apple', unit: 'та', quantity: 18, minQuantity: 8, costPrice: 5700000, sellPrice: 6500000, status: 'in_stock', lifecycle: 'active' },
  { id: '6', name: 'Xiaomi Redmi Pad SE', sku: 'XMI-PAD-SE', category: 'Planshetlar', brand: 'Xiaomi', unit: 'та', quantity: 3, minQuantity: 8, costPrice: 3100000, sellPrice: 3600000, status: 'low_stock', lifecycle: 'inactive' },
  { id: '7', name: 'JBL Tune 510BT', sku: 'JBL-510BT', category: 'Quloqchinlar', brand: 'JBL', unit: 'та', quantity: 12, minQuantity: 10, costPrice: 480000, sellPrice: 650000, status: 'in_stock', lifecycle: 'deleted' },
];

type TabKey = 'all' | 'available' | 'low' | 'out' | 'scale' | 'inactive' | 'deleted' | 'barcodes';

export function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [tab, setTab] = useState<TabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { t } = useTranslation();

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'all', label: t('inventory.tabs.all') },
    { key: 'available', label: t('inventory.tabs.available') },
    { key: 'low', label: t('inventory.tabs.low') },
    { key: 'out', label: t('inventory.tabs.out') },
    { key: 'scale', label: t('inventory.tabs.scale') },
    { key: 'inactive', label: t('inventory.tabs.inactive') },
    { key: 'deleted', label: t('inventory.tabs.deleted') },
    { key: 'barcodes', label: t('inventory.tabs.barcodes') },
  ];

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'in_stock':
        return <Badge variant="success">{t('inventory.statusInStock')}</Badge>;
      case 'low_stock':
        return <Badge variant="warning">{t('inventory.statusLowStock')}</Badge>;
      case 'out_of_stock':
        return <Badge variant="danger">{t('inventory.statusOutOfStock')}</Badge>;
    }
  };

  const activeProducts = products.filter((p) => p.lifecycle === 'active');

  const tabFiltered = products.filter((p) => {
    switch (tab) {
      case 'available':
        return p.lifecycle === 'active' && p.status === 'in_stock';
      case 'low':
        return p.lifecycle === 'active' && p.status === 'low_stock';
      case 'out':
        return p.lifecycle === 'active' && p.status === 'out_of_stock';
      case 'inactive':
        return p.lifecycle === 'inactive';
      case 'deleted':
        return p.lifecycle === 'deleted';
      case 'scale':
      case 'barcodes':
        return false;
      default:
        return p.lifecycle !== 'deleted';
    }
  });

  const filteredProducts = tabFiltered.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    product.sku.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return direction * aVal.localeCompare(bVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction * (aVal - bVal);
    }
    return 0;
  });

  const stats = {
    total: activeProducts.length,
    inStock: activeProducts.filter((p) => p.status === 'in_stock').length,
    lowStock: activeProducts.filter((p) => p.status === 'low_stock').length,
    outOfStock: activeProducts.filter((p) => p.status === 'out_of_stock').length,
    totalValue: activeProducts.reduce((sum, p) => sum + p.sellPrice * p.quantity, 0),
  };

  const toggleLifecycle = (product: Product, lifecycle: Product['lifecycle']) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, lifecycle } : p)));
    const toastKey =
      lifecycle === 'inactive' ? 'inventory.toastDeactivated'
      : lifecycle === 'deleted' ? 'inventory.toastDeleted'
      : lifecycle === 'active' && product.lifecycle === 'inactive' ? 'inventory.toastActivated'
      : 'inventory.toastRestored';
    toast.success(t(toastKey));
  };

  return (
    <div>
      <PageHeader
        title={t('inventory.title')}
        description={t('inventory.description')}
        variant="mobile-adaptive"
        actions={
          <Button variant="primary">
            <Plus className="h-4 w-4" />
            {t('inventory.addProduct')}
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[var(--naf-chrome-bg)] flex items-center justify-center">
                <Package className="h-5 w-5 text-[var(--naf-body-fg)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--naf-body-fg-muted)]">{t('inventory.statTotal')}</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[var(--naf-badge-success-bg)] flex items-center justify-center">
                <Package className="h-5 w-5 text-[var(--naf-badge-success-fg)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--naf-body-fg-muted)]">{t('inventory.statInStock')}</p>
                <p className="text-xl font-bold text-[var(--naf-badge-success-fg)]">{stats.inStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[var(--naf-badge-warning-bg)] flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-[var(--naf-badge-warning-fg)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--naf-body-fg-muted)]">{t('inventory.statLowStock')}</p>
                <p className="text-xl font-bold text-[var(--naf-badge-warning-fg)]">{stats.lowStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[var(--naf-badge-danger-bg)] flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-[var(--naf-badge-danger-fg)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--naf-body-fg-muted)]">{t('inventory.statOutOfStock')}</p>
                <p className="text-xl font-bold text-[var(--naf-badge-danger-fg)]">{stats.outOfStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-[var(--naf-body-fg-muted)]">{t('inventory.statTotalValue')}</p>
              <p className="text-xl font-bold">{formatCurrency(stats.totalValue)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 border-b border-[var(--naf-border-subtle)] mb-6 overflow-x-auto">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
              tab === item.key
                ? 'border-[var(--naf-accent)] text-[var(--naf-accent)]'
                : 'border-transparent text-[var(--naf-body-fg-muted)] hover:text-[var(--naf-body-fg)]'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--naf-body-fg-muted)]" />
              <Input
                placeholder={t('inventory.searchPlaceholder')}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                {t('inventory.filterButton')}
              </Button>
              <Button variant="outline">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {t('inventory.sortButton')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('inventory.listTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedProducts.length === 0 ? (
            <EmptyState
              title={t('inventory.emptyTitle')}
              description={t('inventory.emptyDescription')}
              icon={Search}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                    {t('inventory.colName')} {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('quantity')} className="cursor-pointer text-center">
                    {t('inventory.colQty')} {sortField === 'quantity' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-center">{t('inventory.colUnit')}</TableHead>
                  <TableHead onClick={() => handleSort('sellPrice')} className="cursor-pointer text-right">
                    {t('inventory.colPrice')} {sortField === 'sellPrice' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-right">{t('inventory.colCostSum')}</TableHead>
                  <TableHead className="text-right">{t('inventory.colExpectedProfit')}</TableHead>
                  <TableHead className="text-center">{t('inventory.colStatus')}</TableHead>
                  <TableHead className="text-right">{t('inventory.colActions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.map((product, index) => {
                  const costSum = product.costPrice * product.quantity;
                  const expectedProfit = (product.sellPrice - product.costPrice) * product.quantity;
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="text-[var(--naf-body-fg-muted)]">{index + 1}</TableCell>
                      <TableCell>
                        <div className="font-medium text-[var(--naf-body-fg)]">{product.name}</div>
                        <div className="flex gap-1.5 mt-1">
                          <Badge variant="neutral">{product.category}</Badge>
                          <Badge variant="info">{product.brand}</Badge>
                        </div>
                        <div className="text-xs text-[var(--naf-body-fg-muted)] font-mono mt-1">{product.sku}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={product.quantity <= product.minQuantity ? 'text-[var(--naf-badge-danger-fg)] font-medium' : ''}>
                          {product.quantity}
                        </span>
                      </TableCell>
                      <TableCell className="text-center text-[var(--naf-body-fg-muted)]">{product.unit}</TableCell>
                      <TableCell className="text-right">
                        <div className="text-xs text-[var(--naf-body-fg-muted)]">{formatCurrency(product.costPrice)}</div>
                        <div className="font-medium">{formatCurrency(product.sellPrice)}</div>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(costSum)}</TableCell>
                      <TableCell className="text-right text-[var(--naf-status-confirmed-fg)] font-medium">
                        {formatCurrency(expectedProfit)}
                      </TableCell>
                      <TableCell className="text-center">{getStatusBadge(product.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => toast.success(t('inventory.toastEditSoon'))} title={t('inventory.actionEdit')}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => toast.success(t('inventory.toastPrintSoon'))} title={t('inventory.actionPrint')}>
                            <Printer className="h-4 w-4" />
                          </Button>
                          {product.lifecycle === 'deleted' ? (
                            <Button variant="ghost" size="icon" onClick={() => toggleLifecycle(product, 'active')} title={t('inventory.actionRestore')}>
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleLifecycle(product, product.lifecycle === 'inactive' ? 'active' : 'inactive')}
                                title={product.lifecycle === 'inactive' ? t('inventory.actionActivate') : t('inventory.actionDeactivate')}
                              >
                                {product.lifecycle === 'inactive' ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-[var(--naf-danger)] hover:text-[var(--naf-danger-hover)]"
                                onClick={() => toggleLifecycle(product, 'deleted')}
                                title={t('inventory.actionDelete')}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

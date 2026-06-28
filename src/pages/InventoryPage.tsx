import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Search, Plus, Filter, ArrowUpDown, Package, AlertTriangle } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minQuantity: number;
  price: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const mockProducts: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', sku: 'IPH-15-PRO', category: 'Telefonlar', quantity: 45, minQuantity: 10, price: 15000000, status: 'in_stock' },
  { id: '2', name: 'Samsung S24 Ultra', sku: 'SAM-S24-U', category: 'Telefonlar', quantity: 8, minQuantity: 10, price: 14000000, status: 'low_stock' },
  { id: '3', name: 'MacBook Air M3', sku: 'MBA-M3', category: 'Noutbuklar', quantity: 22, minQuantity: 5, price: 12500000, status: 'in_stock' },
  { id: '4', name: 'AirPods Pro 2', sku: 'APP-2', category: 'Quloqchinlar', quantity: 0, minQuantity: 15, price: 3000000, status: 'out_of_stock' },
  { id: '5', name: 'iPad Air 5', sku: 'IPA-5', category: 'Planshetlar', quantity: 18, minQuantity: 8, price: 6500000, status: 'in_stock' },
];

export function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { t } = useTranslation();

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

  const filteredProducts = mockProducts.filter((product) =>
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
    total: mockProducts.length,
    inStock: mockProducts.filter(p => p.status === 'in_stock').length,
    lowStock: mockProducts.filter(p => p.status === 'low_stock').length,
    outOfStock: mockProducts.filter(p => p.status === 'out_of_stock').length,
    totalValue: mockProducts.reduce((sum, p) => sum + p.price * p.quantity, 0),
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
                  <TableHead className="w-20">{t('inventory.colSku')}</TableHead>
                  <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                    {t('inventory.colName')} {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('category')} className="cursor-pointer">
                    {t('inventory.colCategory')} {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('price')} className="cursor-pointer text-right">
                    {t('inventory.colPrice')} {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('quantity')} className="cursor-pointer text-center">
                    {t('inventory.colQty')} {sortField === 'quantity' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-center">{t('inventory.colStatus')}</TableHead>
                  <TableHead className="text-right">{t('inventory.colActions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                    <TableCell className="text-center">
                      <span className={product.quantity <= product.minQuantity ? 'text-[var(--naf-badge-danger-fg)] font-medium' : ''}>
                        {product.quantity} {t('inventory.qtyUnit')}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{getStatusBadge(product.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        {t('common.edit')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

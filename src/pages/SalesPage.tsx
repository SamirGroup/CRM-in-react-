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
import { Search, Plus, Eye, Download } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { formatCurrency } from '@/lib/formatters';
import { useTranslation } from '@/hooks/useTranslation';

interface Sale {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'rejected';
  paymentMethod: 'cash' | 'card' | 'click' | 'payme';
  sellerName: string;
  createdAt: string;
  itemsCount: number;
}

const mockSales: Sale[] = [
  { id: '1', invoiceNumber: 'INV-2024-001', customerName: 'Ali Valiyev', customerPhone: '+998 90 123 45 67', totalAmount: 15000000, status: 'confirmed', paymentMethod: 'click', sellerName: 'Zarina K.', createdAt: '2024-01-15T10:30:00', itemsCount: 2 },
  { id: '2', invoiceNumber: 'INV-2024-002', customerName: 'Malika Sobirova', customerPhone: '+998 91 234 56 78', totalAmount: 8500000, status: 'pending', paymentMethod: 'cash', sellerName: 'Rustam O.', createdAt: '2024-01-15T11:45:00', itemsCount: 1 },
  { id: '3', invoiceNumber: 'INV-2024-003', customerName: 'Jamshid Bekov', customerPhone: '+998 93 345 67 89', totalAmount: 22000000, status: 'confirmed', paymentMethod: 'payme', sellerName: 'Zarina K.', createdAt: '2024-01-15T14:20:00', itemsCount: 3 },
  { id: '4', invoiceNumber: 'INV-2024-004', customerName: 'Nigora Karimova', customerPhone: '+998 99 456 78 90', totalAmount: 5200000, status: 'rejected', paymentMethod: 'card', sellerName: 'Ali V.', createdAt: '2024-01-15T16:00:00', itemsCount: 1 },
  { id: '5', invoiceNumber: 'INV-2024-005', customerName: 'Sherzod Tursunov', customerPhone: '+998 97 567 89 01', totalAmount: 12800000, status: 'confirmed', paymentMethod: 'click', sellerName: 'Malika S.', createdAt: '2024-01-16T09:15:00', itemsCount: 2 },
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function SalesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { t } = useTranslation();

  const getStatusBadge = (status: Sale['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">{t('sales.statusPending')}</Badge>;
      case 'confirmed':
        return <Badge variant="success">{t('sales.statusConfirmed')}</Badge>;
      case 'rejected':
        return <Badge variant="danger">{t('sales.statusRejected')}</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: Sale['paymentMethod']) => {
    const badges = {
      cash: <Badge variant="neutral">{t('sales.paymentCash')}</Badge>,
      card: <Badge variant="info">{t('sales.paymentCard')}</Badge>,
      click: <Badge variant="accent">{t('sales.paymentClick')}</Badge>,
      payme: <Badge variant="accent">{t('sales.paymentPayme')}</Badge>,
    };
    return badges[method];
  };

  const filteredSales = mockSales.filter(
    (sale) =>
      sale.invoiceNumber.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      sale.customerName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      sale.customerPhone.includes(debouncedSearch)
  );

  const stats = {
    total: mockSales.length,
    totalAmount: mockSales.reduce((sum, s) => sum + s.totalAmount, 0),
    confirmed: mockSales.filter((s) => s.status === 'confirmed').length,
    pending: mockSales.filter((s) => s.status === 'pending').length,
  };

  return (
    <div>
      <PageHeader
        title={t('sales.title')}
        description={t('sales.description')}
        variant="mobile-adaptive"
        actions={
          <>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {t('common.export')}
            </Button>
            <Button variant="primary">
              <Plus className="h-4 w-4 mr-2" />
              {t('sales.newSale')}
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[var(--naf-body-fg-muted)]">{t('sales.statTotal')}</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[var(--naf-body-fg-muted)]">{t('sales.statTotalAmount')}</p>
            <p className="text-2xl font-bold text-[var(--naf-accent)]">
              {formatCurrency(stats.totalAmount)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[var(--naf-body-fg-muted)]">{t('sales.statConfirmed')}</p>
            <p className="text-2xl font-bold text-[var(--naf-badge-success-fg)]">{stats.confirmed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[var(--naf-body-fg-muted)]">{t('sales.statPending')}</p>
            <p className="text-2xl font-bold text-[var(--naf-badge-warning-fg)]">{stats.pending}</p>
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
                placeholder={t('sales.searchPlaceholder')}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('sales.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSales.length === 0 ? (
            <EmptyState
              title={t('sales.emptyTitle')}
              description={t('sales.emptyDescription')}
              icon={Search}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('sales.colInvoice')}</TableHead>
                  <TableHead>{t('sales.colCustomer')}</TableHead>
                  <TableHead>{t('sales.colPhone')}</TableHead>
                  <TableHead>{t('sales.colSeller')}</TableHead>
                  <TableHead>{t('sales.colDate')}</TableHead>
                  <TableHead className="text-center">{t('sales.colItems')}</TableHead>
                  <TableHead>{t('sales.colPayment')}</TableHead>
                  <TableHead>{t('sales.colStatus')}</TableHead>
                  <TableHead className="text-right">{t('sales.colAmount')}</TableHead>
                  <TableHead className="text-right">{t('sales.colActions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.invoiceNumber}</TableCell>
                    <TableCell>{sale.customerName}</TableCell>
                    <TableCell>{sale.customerPhone}</TableCell>
                    <TableCell>{sale.sellerName}</TableCell>
                    <TableCell className="text-[var(--naf-body-fg-muted)] text-sm">{formatDate(sale.createdAt)}</TableCell>
                    <TableCell className="text-center">{sale.itemsCount} {t('sales.itemsUnit')}</TableCell>
                    <TableCell>{getPaymentMethodBadge(sale.paymentMethod)}</TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(sale.totalAmount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
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

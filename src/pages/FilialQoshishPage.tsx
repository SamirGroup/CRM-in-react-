import { useEffect, useState } from 'react';
import { Plus, Building2 } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
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
import { CreateBranchModal } from '@/components/branches/CreateBranchModal';
import { useBranchesStore } from '@/store/useBranchesStore';
import { useTranslation } from '@/hooks/useTranslation';

export function FilialQoshishPage() {
  const { t } = useTranslation();
  const { branches, fetchBranches } = useBranchesStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (branches.length === 0) fetchBranches();
  }, [branches.length, fetchBranches]);

  return (
    <div>
      <PageHeader
        title={t('nav.filiallar.qoshish')}
        description={t('filialQoshish.description')}
        variant="mobile-adaptive"
        actions={
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            {t('filialQoshish.createButton')}
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{t('filialQoshish.listTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          {branches.length === 0 ? (
            <EmptyState
              icon={Building2}
              title={t('filialQoshish.emptyTitle')}
              description={t('filialQoshish.emptyDescription')}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('filialQoshish.colName')}</TableHead>
                  <TableHead>{t('filialQoshish.colAddress')}</TableHead>
                  <TableHead>{t('filialQoshish.colPhone')}</TableHead>
                  <TableHead>{t('filialQoshish.colDirector')}</TableHead>
                  <TableHead className="text-center">{t('filialQoshish.colStatus')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell className="font-medium">{branch.name}</TableCell>
                    <TableCell className="text-[var(--naf-body-fg-muted)]">{branch.address || '—'}</TableCell>
                    <TableCell>{branch.phone || '—'}</TableCell>
                    <TableCell>{branch.directorName || '—'}</TableCell>
                    <TableCell className="text-center">
                      {branch.is_active ? (
                        <Badge variant="success">{t('filialQoshish.statusActive')}</Badge>
                      ) : (
                        <Badge variant="neutral">{t('filialQoshish.statusInactive')}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CreateBranchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

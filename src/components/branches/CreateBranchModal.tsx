import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useTranslation } from '@/hooks/useTranslation';
import { useBranchesStore } from '@/store/useBranchesStore';
import type { Branch } from '@/types';

export interface CreateBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BranchForm = {
  officialName: string;
  officialAddress: string;
  directorName: string;
  directorPhone: string;
  inn: string;
  bankAccount: string;
  mfo: string;
  vatCode: string;
  agent: string;
};

export function CreateBranchModal({ isOpen, onClose }: CreateBranchModalProps) {
  const { t } = useTranslation();
  const addBranch = useBranchesStore((s) => s.addBranch);

  const branchSchema = z.object({
    officialName: z.string().min(1, t('branchModal.nameRequired')),
    officialAddress: z.string().optional().default(''),
    directorName: z.string().optional().default(''),
    directorPhone: z.string().optional().default(''),
    inn: z.string().optional().default(''),
    bankAccount: z.string().optional().default(''),
    mfo: z.string().optional().default(''),
    vatCode: z.string().optional().default(''),
    agent: z.string().optional().default(''),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BranchForm>({ resolver: zodResolver(branchSchema) });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: BranchForm) => {
    const branch: Branch = {
      id: crypto.randomUUID(),
      name: data.officialName,
      address: data.officialAddress,
      phone: data.directorPhone,
      is_active: true,
      created_at: new Date().toISOString(),
      directorName: data.directorName,
      directorPhone: data.directorPhone,
      inn: data.inn,
      bankAccount: data.bankAccount,
      mfo: data.mfo,
      vatCode: data.vatCode,
      agent: data.agent,
    };
    addBranch(branch);
    toast.success(t('branchModal.saved'));
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('branchModal.title')}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            {t('branchModal.cancel')}
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            {t('branchModal.save')}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="officialName">{t('branchModal.officialName')}</Label>
          <Input id="officialName" {...register('officialName')} />
          {errors.officialName && (
            <p className="text-sm text-[var(--naf-danger)]">{errors.officialName.message}</p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="officialAddress">{t('branchModal.officialAddress')}</Label>
          <Input id="officialAddress" {...register('officialAddress')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="directorName">{t('branchModal.directorName')}</Label>
          <Input id="directorName" {...register('directorName')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="directorPhone">{t('branchModal.directorPhone')}</Label>
          <Input id="directorPhone" {...register('directorPhone')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="inn">{t('branchModal.inn')}</Label>
          <Input id="inn" {...register('inn')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bankAccount">{t('branchModal.bankAccount')}</Label>
          <Input id="bankAccount" {...register('bankAccount')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mfo">{t('branchModal.mfo')}</Label>
          <Input id="mfo" {...register('mfo')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vatCode">{t('branchModal.vatCode')}</Label>
          <Input id="vatCode" {...register('vatCode')} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="agent">{t('branchModal.agent')}</Label>
          <Input id="agent" {...register('agent')} />
        </div>
      </form>
    </Modal>
  );
}

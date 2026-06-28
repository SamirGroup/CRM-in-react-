import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

export function GeneralSettingsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t('nav.sozlama.umumiy')} variant="mobile-adaptive" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('general.appInfoTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-[var(--naf-body-fg-muted)]">{t('general.appName')}</dt>
                <dd className="text-sm font-semibold text-[var(--naf-body-fg)]">
                  CON<span className="text-[var(--naf-accent)]">DOR</span> CRM
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-[var(--naf-body-fg-muted)]">{t('general.appVersion')}</dt>
                <dd className="text-sm font-semibold text-[var(--naf-body-fg)]">1.0.0</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('general.languageTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--naf-body-fg-muted)] mb-4">
              {t('general.languageDescription')}
            </p>
            <LanguageSwitcher />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

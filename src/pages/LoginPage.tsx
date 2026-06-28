import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, User, Lock, Loader2, Store } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { toast } from 'sonner';

type LoginForm = { username: string; password: string };

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loginSchema = z.object({
    username: z.string().min(1, t('login.usernameRequired')),
    password: z.string().min(1, t('login.passwordRequired')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.username, data.password);
      toast.success(t('common.loggedInSuccess'));
      navigate('/dashboard');
    } catch {
      toast.error(t('login.invalidCreds'));
    }
  };

  return (
    <div className="relative min-h-dvh flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-[var(--naf-page-bg)] to-[var(--naf-chrome-bg)]">
      {/* Decorative ambient glows */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: 'color-mix(in srgb, var(--naf-accent) 25%, transparent)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'color-mix(in srgb, var(--naf-chart-series-2) 20%, transparent)' }}
      />

      <div className="absolute top-4 right-4 w-44">
        <LanguageSwitcher />
      </div>

      <Card className="relative w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-[var(--naf-accent)] flex items-center justify-center shadow-[var(--naf-popover-shadow)]">
              <Store className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            CON<span className="text-[var(--naf-accent)]">DOR</span> CRM
          </CardTitle>
          <CardDescription>{t('login.subtitle')}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t('login.username')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--naf-body-fg-muted)]" />
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="admin"
                  className="pl-10"
                  {...register('username')}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-[var(--naf-danger)]">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--naf-body-fg-muted)]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  {...register('password')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-[var(--naf-danger)]">{errors.password.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" variant="primary" isLoading={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('login.submitting')}
                </>
              ) : (
                t('login.submit')
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

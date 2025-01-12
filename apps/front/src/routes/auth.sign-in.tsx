import { axiosClient } from '@/api/client';
import { useToken } from '@/hooks/useToken';
import { cn } from '@/lib/utils';
import { Field } from '@base-ui-components/react/field';
import { Form } from '@base-ui-components/react/form';
import { Separator } from '@base-ui-components/react/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { EyeOff, Eye } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/auth/sign-in')({
    component: RouteComponent,
    loader: () => {
        if (useToken.getState().accessToken) {
            return redirect({ to: '/', replace: true });
        }
    },
});

function RouteComponent() {
    const navigate = Route.useNavigate();
    const { t } = useTranslation();

    const [shouldShowPassword, setShouldShowPassword] = useState(false);

    const toggleShouldShowPassword = () => {
        setShouldShowPassword((prev) => !prev);
    };

    const formSchema = z.object({
        email: z.string().email({ message: t('signIn.emailInvalid') }),
        password: z.string().min(8, { message: t('signIn.passwordMinLength') }),
    });

    type FormSchema = z.infer<typeof formSchema>;

    const handleTokens = useToken((state) => state.handleTokens);

    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isValid },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '' },
        mode: 'onSubmit',
    });

    const { mutate: signIn, isPending } = useMutation({
        mutationFn: axiosClient.auth.signIn,
        onSuccess: (data) => {
            if (data.status !== 200) {
                setError('root', { message: 'Error' });
                return;
            }

            handleTokens(data.body);

            navigate({ to: '/' });
        },
    });

    return (
        <Form
            className="flex min-h-screen flex-col gap-10 p-8"
            errors={Object.entries(errors)
                .map(([key, value]) => [key, value.message] as const)
                .reduce(
                    (curr, [key, value]) => {
                        curr[key] = value || '';
                        return curr;
                    },
                    {} as Record<string, string>,
                )}
            onSubmit={handleSubmit((body) => {
                signIn({ body });
            })}
        >
            <div>
                <h1 className="text-center text-2xl font-bold">{t('signIn.signIn')}</h1>
            </div>

            <button className="m-0 rounded-md border border-slate-500 px-4 py-3 text-slate-700">{t('signIn.googlAuth')}</button>
            <Separator className={'h-[1px] bg-slate-200'} />

            <div className="flex flex-col gap-4">
                <Field.Root className={'relative flex flex-col gap-2'} name="email">
                    <Field.Label className={'text-sm font-bold'}>{t('signIn.email')}</Field.Label>
                    <Field.Control
                        className={'m-0 h-[46px] rounded-md border border-slate-200 px-4 text-base invalid:border-red-700 focus:outline-indigo-500'}
                        placeholder={t('signIn.emailPlaceholder')}
                        autoComplete="email"
                        type="email"
                        {...register('email')}
                    />
                    <Field.Error className={'text-sm italic text-red-700'} />
                </Field.Root>

                <Field.Root className={'relative flex flex-col gap-2'} name="password">
                    <Field.Label className={'text-sm font-bold'}>{t('signIn.password')}</Field.Label>
                    <Field.Control
                        className={'m-0 h-[46px] rounded-md border border-slate-200 px-4 text-base invalid:border-red-700 focus:outline-indigo-500'}
                        placeholder={shouldShowPassword ? t('signIn.passwordDisplayedPlaceholder') : t('signIn.passwordNotDisplayedPlaceholder')}
                        autoComplete="current-password"
                        type={shouldShowPassword ? 'text' : 'password'}
                        {...register('password')}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleShouldShowPassword();
                        }}
                        className="absolute right-4 top-[39px] cursor-pointer text-slate-400 hover:text-slate-600"
                    >
                        {shouldShowPassword ? <EyeOff /> : <Eye />}
                    </button>

                    <Field.Error className={'Test text-sm italic text-red-700'} />
                </Field.Root>
            </div>
            <div className="flex flex-col gap-4 transition-all">
                <input
                    type="submit"
                    disabled={isPending}
                    value={t('signIn.signIn')}
                    className={cn(
                        'cursor-pointer rounded-md bg-indigo-600 px-4 py-3 text-center text-white transition-all hover:scale-105 hover:bg-indigo-500 active:scale-100',
                        { 'bg-slate-300 hover:scale-100 hover:bg-slate-300': isPending || !isValid },
                    )}
                />
                <Link to="/" className="text-center text-slate-600 underline transition-all hover:text-indigo-700">
                    {t('signIn.forgetPassword')}
                </Link>
                <span>
                    {t('signIn.noAccount')}{' '}
                    <Link to="/auth/sign-up" className="text-center text-slate-600 underline transition-all hover:text-indigo-700">
                        {t('signIn.signUp')}
                    </Link>
                </span>
            </div>
        </Form>
    );
}

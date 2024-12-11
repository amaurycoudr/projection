import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator as zodSearchValidator } from '@tanstack/zod-adapter';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { z } from 'zod';
import { axiosClient } from '../../api/client';
import { useToken } from '../../hooks/useToken';
import { router } from '../../main';

export const Route = createFileRoute('/auth/sign-in')({
    component: RouteComponent,
    validateSearch: zodSearchValidator(
        z.object({
            redirectTo: z.string().optional(),
        }),
    ),
    loaderDeps: ({ search }) => ({ redirectTo: search.redirectTo }),

    loader: ({ deps: { redirectTo } }) => {
        if (useToken.getState().accessToken) {
            if (redirectTo) {
                return router.navigate({ to: redirectTo, replace: true });
            }
            return router.navigate({ to: '/', replace: true });
        }
    },
});

const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(50, { message: 'Password must be at most 50 characters long' }),
});

function RouteComponent() {
    const navigate = Route.useNavigate();
    const search = Route.useSearch();

    const handleTokens = useToken((state) => state.handleTokens);

    const { mutate: signIn } = useMutation({
        mutationFn: axiosClient.auth.signIn,
        onSuccess: (data) => {
            if (data.status !== 200) {
                return;
            }

            handleTokens({ accessToken: data.body.accessToken, refreshToken: data.body.refreshToken });

            if (search.redirectTo) {
                navigate({ to: search.redirectTo });
            }
            navigate({ to: '/' });
        },
    });

    const signInForm = useForm({
        validatorAdapter: zodValidator(),
        validators: { onChange: formSchema, onMount: formSchema },
        defaultValues: { email: '', password: '' },

        onSubmit: ({ value: body }) => signIn({ body }),
    });

    return (
        <form
            className="flex min-h-screen flex-col gap-4 bg-gray-100 p-8"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                signInForm.handleSubmit();
            }}
        >
            <signInForm.Field
                name="email"
                children={(field) => (
                    <input
                        type="email"
                        autoComplete="email"
                        className="rounded-md border border-gray-300 bg-white p-2"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                )}
            />
            <signInForm.Field
                name="password"
                children={(field) => (
                    <input
                        type="password"
                        autoComplete="current-password"
                        className="rounded-md border border-gray-300 bg-white p-2"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                )}
            />

            <signInForm.Subscribe
                children={(state) => (
                    <input
                        type="submit"
                        className={`rounded-md p-2 text-white ${state.isFormValid ? 'bg-blue-500' : 'bg-gray-300'}`}
                        value="Sign in"
                    />
                )}
            />
        </form>
    );
}

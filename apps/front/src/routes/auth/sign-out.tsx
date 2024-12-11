import { createFileRoute, redirect } from '@tanstack/react-router';
import { useToken } from '../../hooks/useToken';

export const Route = createFileRoute('/auth/sign-out')({
    preload: false,
    component: RouteComponent,
    loader: ({ context }) => {
        useToken.getState().clearTokens();
        context.queryClient.clear();
        return redirect({ to: '/', replace: true });
    },
});

function RouteComponent() {
    return <div />;
}

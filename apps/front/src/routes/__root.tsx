import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';
import { useToken } from '../hooks/useToken';
import { QueryClient } from '@tanstack/react-query';

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : lazy(() =>
              import('@tanstack/router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
              })),
          );

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    component: RootComponent,
});

function RootComponent() {
    const accessToken = useToken((state) => state.accessToken);
    const isAuthenticated = !!accessToken;

    return (
        <>
            <div className="text-md flex gap-2 p-2">
                <Link to="/" activeProps={{ className: 'font-bold' }} activeOptions={{ exact: true }}>
                    Home
                </Link>
                <Link to="/about" activeProps={{ className: 'font-bold' }}>
                    About
                </Link>
                {isAuthenticated ? (
                    <Link to="/auth/sign-out" replace>
                        Sign Out
                    </Link>
                ) : (
                    <Link to="/auth/sign-in" search={{ redirectTo: '/about' }}>
                        Sign In
                    </Link>
                )}
            </div>
            <hr />
            <Outlet />
            <Suspense fallback={null}>
                <TanStackRouterDevtools position="bottom-left" />
            </Suspense>
            <ReactQueryDevtools position="bottom" />
        </>
    );
}

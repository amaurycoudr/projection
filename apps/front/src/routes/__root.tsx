import { QueryClient } from '@tanstack/react-query';

import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : lazy(() =>
              import('@tanstack/router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
              })),
          );

const ReactQueryDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : lazy(() => import('@tanstack/react-query-devtools').then((res) => ({ default: res.ReactQueryDevtools })));

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Outlet />
            <Suspense fallback={null}>
                <TanStackRouterDevtools position="bottom-left" />
                <ReactQueryDevtools position="bottom" />
            </Suspense>
        </>
    );
}

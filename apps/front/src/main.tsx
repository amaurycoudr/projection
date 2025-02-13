import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import './index.css';
import { routeTree } from './routeTree.gen';
import './i18n/i18n-config';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: ({ state: { data } }) => {
                const isStatusValid = ((data as { status?: number } | undefined)?.status || 200) < 300;
                if (isStatusValid) {
                    return 1000 * 5;
                }
                return 0;
            },
            refetchOnWindowFocus: false,
        },
    },
});

export const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>,
    );
}

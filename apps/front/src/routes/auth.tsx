import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex h-screen w-screen bg-slate-100">
            <div className="flex-[1.5]" />
            <div className="flex-1 bg-white">
                <Outlet />
            </div>
        </div>
    );
}

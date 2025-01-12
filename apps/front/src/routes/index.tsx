import { useToken } from '@/hooks/useToken';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: HomeComponent,
});

function HomeComponent() {
    const { accessToken, exp, userStatus, userId } = useToken();
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100">
            <div className="flex">
                <Link className="border-l border-slate-300 p-2" to="/auth/sign-out">
                    SIGN OUT
                </Link>
                <Link className="border-l border-slate-300 p-2" to="/auth/sign-in">
                    SIGN IN
                </Link>
                <Link className="border-l border-slate-300 p-2" to="/auth/sign-up">
                    SIGN UP
                </Link>
            </div>

            <div className="flex max-w-96 flex-col gap-4">
                <div className="truncate text-base">
                    <span className="text-sm">userStatus </span> : {userStatus}
                </div>
                <div className="truncate text-base">
                    <span className="text-sm">accessToken </span> : {accessToken}
                </div>
                <div className="truncate text-base">
                    <span className="text-sm">exp </span> : {exp}
                </div>
                <div className="truncate text-base">
                    <span className="text-sm">userId </span> : {userId}
                </div>
            </div>
        </div>
    );
}

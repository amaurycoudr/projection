import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
    component: HomeComponent,
});

function HomeComponent() {
    const { t } = useTranslation();
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold">{t('home.welcome')}</h1>
            <p className="text-lg text-gray-600">{t('home.description')}</p>
            <Link className="min-w-40 rounded-md bg-blue-500 px-4 py-2 text-center text-white" to="/auth/sign-up">
                {t('home.signUp')}
            </Link>
            <Link to="/auth/sign-in">{t('home.signIn')}</Link>
        </div>
    );
}

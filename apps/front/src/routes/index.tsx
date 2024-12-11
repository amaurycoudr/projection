import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
    component: HomeComponent,
});

function HomeComponent() {
    const { t } = useTranslation();
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h1>{t('home.welcome')}</h1>
                    </CardTitle>
                    <CardDescription>{t('home.description')}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Button asChild>
                        <Link to="/auth/sign-up">{t('home.signUp')}</Link>
                    </Button>

                    <Button variant={'secondary'} asChild>
                        <Link to="/auth/sign-in">{t('home.signIn')}</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

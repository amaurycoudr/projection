import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { axiosClient } from '../api/client';

export const Route = createFileRoute('/')({
    component: HomeComponent,
});

function HomeComponent() {
    const { data } = useQuery({ queryKey: ['health'], queryFn: () => axiosClient.core.getHealth() });
    if (data?.status !== 200) {
        return <div>Error</div>;
    }

    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
            {data?.body.status}
        </div>
    );
}

import { useForm, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { post, processing } = useForm();
    const { canCreateUser } = usePage().props;

    const logout = (e) => {
        e.preventDefault();
        post('/logout');
    };

    return (
        <div>
            <h1>Dashboard</h1>

            {canCreateUser && (
                <button onClick={() => alert('Tambah User')}>
                    Tambah User
                </button>
            )}

            <form onSubmit={logout}>
                <button type="submit" disabled={processing}>
                    {processing ? 'Logging out...' : 'Logout'}
                </button>
            </form>
        </div>
    );
}

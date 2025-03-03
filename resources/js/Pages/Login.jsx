import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, errors } = useForm({ email: '', password: '' });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email" />
                {errors.email && <p>{errors.email}</p>}
                <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Password" />
                {errors.password && <p>{errors.password}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

import {Alert, Button, Card, Label, Spinner, TextInput} from 'flowbite-react';
import {useState} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router';
import logo from '../assets/logo.svg';
import {useAuth} from '../auth/AuthContext.jsx';

export default function LoginPage() {
    const {user, login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname ?? '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    if (user) {
        return <Navigate to={redirectTo} replace />;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            await login(email, password);
            navigate(redirectTo, {replace: true});
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="flex min-h-svh items-center justify-center px-4 py-12">
            <div className="w-full max-w-sm">
                <h1 className="mb-8 flex justify-center">
                    <img src={logo} alt="Clubio" className="size-32" />
                </h1>

                <Card>
                    <h2 className="text-xl font-semibold text-white">Anmelden</h2>

                    {error && (
                        <Alert color="failure" onDismiss={() => setError(null)}>
                            {error}
                        </Alert>
                    )}

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">E-Mail-Adresse</Label>
                            <TextInput id="email" type="email" autoComplete="email" placeholder="name@verein.de" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Passwort</Label>
                            <TextInput id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" disabled={submitting} className="mt-2">
                            {submitting && <Spinner size="sm" className="me-2" light />}
                            Anmelden
                        </Button>
                    </form>
                </Card>
            </div>
        </main>
    );
}

import {Button} from 'flowbite-react';
import logo from '../assets/logo.svg';
import {useAuth} from '../auth/AuthContext.jsx';

export default function HomePage() {
    const {user, logout} = useAuth();

    return (
        <div className="min-h-svh">
            <header className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                <img src={logo} alt="Clubio" className="size-12" />
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">{user.email}</span>
                    <Button size="sm" color="alternative" onClick={logout}>
                        Abmelden
                    </Button>
                </div>
            </header>
            <main className="p-4 text-gray-400">Willkommen bei Clubio.</main>
        </div>
    );
}

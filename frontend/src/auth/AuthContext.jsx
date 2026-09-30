import {createContext, useCallback, useContext, useMemo, useState} from 'react';

const TOKEN_KEY = 'clubio.session';

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [session, setSession] = useState(localStorage.getItem(TOKEN_KEY) || null);

    const login = useCallback(async (email, password) => {
        if (!email || !password) {
            throw new Error('Bitte E-Mail-Adresse und Passwort angeben.');
        }
        const next = 'new key';
        localStorage.setItem(TOKEN_KEY, JSON.stringify(next));
        setSession(() => next);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        setSession(() => null);
    }, []);

    const value = useMemo(() => ({key: session, login, logout}), [session, login, logout]);

    return <AuthContext value={value}>{children}</AuthContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

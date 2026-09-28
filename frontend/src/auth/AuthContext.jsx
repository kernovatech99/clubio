import {createContext, useCallback, useContext, useMemo, useState} from 'react';

const STORAGE_KEY = 'clubio.session';

const AuthContext = createContext(null);

function readSession() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
        return null;
    }
}

export function AuthProvider({children}) {
    const [session, setSession] = useState(readSession);

    // TODO: Gegen das Backend authentifizieren, sobald es einen Login-Endpunkt gibt.
    // Bis dahin wird jede Kombination aus E-Mail und Passwort akzeptiert.
    const login = useCallback(async (email, password) => {
        if (!email || !password) {
            throw new Error('Bitte E-Mail-Adresse und Passwort angeben.');
        }
        const next = {user: {email}};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setSession(next);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setSession(null);
    }, []);

    const value = useMemo(() => ({user: session?.user ?? null, login, logout}), [session, login, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

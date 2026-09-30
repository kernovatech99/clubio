import {createContext, useCallback, useContext, useMemo, useState} from 'react';

const USER_KEY = 'clubio.user';

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export class ValidationError extends Error {
    constructor(messages) {
        super(Object.values(messages).flat()[0] ?? 'Anmeldung fehlgeschlagen.');
        this.messages = messages;
    }
}

function loadUser() {
    try {
        return JSON.parse(localStorage.getItem(USER_KEY)) ?? null;
    } catch {
        return null;
    }
}

export function AuthProvider({children}) {
    const [user, setUser] = useState(loadUser);

    const login = useCallback(async (email, password) => {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new ValidationError(data.messages ?? {email: ['Anmeldung fehlgeschlagen.']});
        }

        localStorage.setItem(USER_KEY, JSON.stringify(data));
        setUser(data);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(USER_KEY);
        setUser(null);
    }, []);

    const value = useMemo(() => ({user, login, logout}), [user, login, logout]);

    return <AuthContext value={value}>{children}</AuthContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

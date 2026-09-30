import {Navigate, Outlet} from 'react-router';
import {useAuth} from '../auth/AuthContext.jsx';

export default function RequireAuth() {
    const {user} = useAuth();

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

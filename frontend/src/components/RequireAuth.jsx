import {Navigate, Outlet} from 'react-router';
import {useAuth} from '../auth/AuthContext.jsx';

export default function RequireAuth() {
    const {key} = useAuth();

    if (key === null) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

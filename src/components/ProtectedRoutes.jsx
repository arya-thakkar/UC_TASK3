import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isAuthenticated = () => {
        const cookies = document.cookie;

        return cookies.includes('token=');
    };

    const hasToken = isAuthenticated();

    if (!hasToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
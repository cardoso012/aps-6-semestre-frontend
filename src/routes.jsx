import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Login } from './pages/login';
import { Register } from './pages/register';
import { DashboardPage } from './pages/dashboard';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/dashboard',
        element: <DashboardPage />
    }
]);

export { routes };
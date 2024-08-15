import {Navigate, Outlet} from 'react-router-dom';

interface IProtectedRoute {
    isAuthenticated: any,
    children: any
}

export const PrivateRoute = (props: IProtectedRoute) => {
    if (!props.isAuthenticated) {
        return <Navigate to="/login" replace={true} />;
    }

    return props.children;
};
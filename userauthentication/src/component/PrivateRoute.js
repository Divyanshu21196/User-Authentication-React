import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../hooks/CustomHooks';

export { PrivateRoute };

function PrivateRoute() {
    
    const { user_state } = useAuthContext();
    
    if (!user_state?.isLoggedIn) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/account/login" />
    }

    // authorized so return outlet for child routes
    return <Outlet />;
}
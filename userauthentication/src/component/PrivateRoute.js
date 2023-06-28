import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export { PrivateRoute };

function PrivateRoute() {
    console.log("----")
    const auth = {};

    if (!auth?.email) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/account/login" />
    }

    // authorized so return outlet for child routes
    return <Outlet />;
}
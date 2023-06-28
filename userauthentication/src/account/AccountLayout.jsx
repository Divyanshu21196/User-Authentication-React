import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './';

export { AccountLayout };

function AccountLayout() {
    const auth = {};

    // redirect to home if already logged in
    if (auth?.email) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 offset-sm-2 mt-5">
                    <Routes>
                        <Route path="login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
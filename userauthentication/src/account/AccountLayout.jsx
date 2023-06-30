import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './';
import { SignUp } from './SignUp';
import {useAuthContext} from '../hooks/CustomHooks';


export { AccountLayout };

function AccountLayout() {

    const {user_state} = useAuthContext();

    // redirect to home if already logged in
    if (user_state?.isLoggedIn) {
        return <Navigate to="/employe" />;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 offset-sm-2 mt-5">
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<SignUp />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
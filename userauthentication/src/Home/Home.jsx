import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuthContext from '../hooks/CustomHooks';

export { Home };

function Home() {
    const { user_state } = useAuthContext();
    return (
        <div>
            <h1>Hi {user_state?.email}!</h1>
            <p>You're logged in with React 18 + Redux & JWT!!</p>
            <p><Link to="/users">Manage Users</Link></p>
        </div>
    );
}
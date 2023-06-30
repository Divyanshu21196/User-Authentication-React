import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useAuthContext, useEmployeContext} from '../hooks/CustomHooks';
import HomeTable from './EmployeeTable';
import { EmployeeProvider } from '../context/EmployeeContext';

export { Home };

function Home() {

    const {config,employee_state} = useEmployeContext();

    const { user_state } = useAuthContext();

    console.log(employee_state)
    return (
        <EmployeeProvider>
        <div className='container'>
        <div className='row'>
            <div className='col-md-6 text-center'>
            <h1>Hi {user_state?.auth?.email}...</h1>
            </div>
            <div className='col-md-6'>
            <Link to="../employe/add" className="btn btn-info mt-4">Register</Link>
            </div>
        </div>
            <p>Hello Welcome to Employee Management Kiosk</p>
            <>
            <HomeTable data={employee_state}  config={config}/>
            </>
        </div>
        </EmployeeProvider>
    );
}
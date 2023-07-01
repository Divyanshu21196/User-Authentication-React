import {React,useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useAuthContext, useEmployeContext} from '../hooks/CustomHooks';
import HomeTable from './EmployeeTable';
import { EmployeeProvider } from '../context/EmployeeContext';

export { Home };

function Home() {

    const {config,employee_state,handleSearchedResults} = useEmployeContext();

    const { user_state } = useAuthContext();

    const [search_term,setSearchTerm] = useState('');

    const handleChange = (event) =>{
        setSearchTerm(event.target.value);
        handleSearchedResults(search_term);
    }

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
            <div className='col-md-4'>
                <label className='form-label'>Search</label>
                <input type="text" value={search_term} onChange={handleChange} placeholder='Search By Name or Email' className='form-control'/>
            </div>
            <div className='row mt-4'>
                <HomeTable data={employee_state}  config={config}/>
            </div>
            </>
        </div>
        </EmployeeProvider>
    );
}
import { useContext } from "react";
import AuthContext from '../context/AuthContext';

import EmployeeContext from "../context/EmployeeContext";


function useAuthContext(){
    return useContext(AuthContext);
}

function useEmployeContext(){
    return useContext(EmployeeContext);
}


export { useEmployeContext, useAuthContext};
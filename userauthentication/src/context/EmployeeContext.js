import { createContext ,useState } from "react";
import {  useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import


const EmployeeContext = createContext();


function EmployeeProvider({children}){

    const navigate = useNavigate();

    const [employee_state,setEmployeeData] = useState([]);
    const [is_add_event,setEventStatus] = useState(true);
    const [is_listing_ordered_asc,setSortingOrder] = useState(true);


    const config = [
        {
            label:'Employee Name',
            render :(employee)=>employee.name,
        },
        {
            label:'Email',
            render :(employee)=>employee.email,
        },
        {
            label:'Date of Birth',
            render :(employee)=>(employee.dob).toString(),
        },
        {
            label:'Employee Salary',
            render :(employee)=><div>$ {employee.salary}</div>,
        },
        {
            label:'Status',
            render :(employee)=><div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary active">
              <input type="radio" name="options" onChange={()=>handleStatusChange(employee,true)} id="option1" autocomplete="off" checked={employee.is_active} /> Active
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" onChange={()=>handleStatusChange(employee,false)} id="option2" autocomplete="off" checked={!employee.is_active}/> InActive
            </label>
          </div>,
          data:employee_state
        },
        {
            label:'Action',
            render :(book)=><div><button className="btn btn-danger" onClick={()=>{deleteBookHandler(book)}}>Delete</button> <button className="btn btn-info" onClick={()=>{editBookHandler(book)}}>Edit</button></div>,
        }
    ];
     

    const handleSubmitHandler = (employee_info) =>{
       
        setEmployeeData((prevState)=>[...prevState,{...employee_info}]);
    }

    const handleStatusChange = (employee_info,status) => {
            const updatedArray = (employee_state || []).map((employee)=>{

                if(employee.id ==  employee_info.id){
                    employee.is_active = status
                }
                return employee 
            });
            setEmployeeData(updatedArray)
        
    }

    const sortListingByName = (data) =>{
        let updated_array = data;
        
        if(is_listing_ordered_asc){
        
            updated_array.sort((e1, e2) => e1.name.toLowerCase().localeCompare(e2.name.toLowerCase()));
         
        }else{
        
            updated_array.sort((e1, e2) => e2.name.toLowerCase().localeCompare(e1.name.toLowerCase()));
        
        }

        setEmployeeData((prevState)=>[...prevState,...updated_array])
         
        setSortingOrder(!is_listing_ordered_asc)
       
        
    }

    const handleSearchedResults = (seacrh_item) => {
        
        if(seacrh_item && seacrh_item.length > 3){
            const updated_search_results = (employee_state || []).filter(employee=>employee.name == seacrh_item);
            
            setEmployeeData(updated_search_results);
        }
    }

    
    const deleteBookHandler = (employee_info) => {

        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this employee',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    const filter_deleted_employee = (employee_state || []).filter(employe=>employe.id !== employee_info.id);
                     setEmployeeData(filter_deleted_employee);
                }
              },
              {
                label: 'No',
              }
            ]
          });

    }

    const editBookHandler = (employee_info) => {
        setEventStatus(false);
        navigate(`/employe/edit/${employee_info.id}`)
    }


    const handlerEditSubmit = (employee_info) =>{
       
        const updatedArray = (employee_state || []).map((employee)=>{

            if(employee.id == employee_info.id){
                return {...employee,...employee_info}
            }

            return employee
        });
        setEmployeeData(updatedArray);
        setEventStatus(true);
    }



    const valueToShare = {
        employee_state,
        is_add_event,
        config,
        handleSubmitHandler,
        handlerEditSubmit,
        deleteBookHandler,
        sortListingByName,
        handleSearchedResults
        }
        
        return(
            <EmployeeContext.Provider value={valueToShare}>
                {children}
            </EmployeeContext.Provider>
        )
}


export {EmployeeProvider};
export default EmployeeContext;
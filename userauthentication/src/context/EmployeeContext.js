import { createContext ,useState } from "react";


const EmployeeContext = createContext();


function EmployeeProvider({children}){

    const [employee_state,setEmployeeData] = useState([]);
    const [is_add_event,setEventStatus] = useState(true);
    const [employee_selected_data,setEventDetails] = useState(false);

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
              <input type="radio" name="options" id="option1" autocomplete="off" checked /> Active
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="option2" autocomplete="off" /> InActive
            </label>
          </div>,
        },
        {
            label:'Action',
            render :(book)=><div><button className="btn btn-danger" onClick={()=>{deleteBookHandler(book)}}>Delete</button> <button className="btn btn-info" onClick={()=>{editBookHandler(book)}}>Edit</button></div>,
        }
    ];
     

    const handleSubmitHandler = (employee_info) =>{
        setEmployeeData((prevState)=>[...prevState,{...employee_info}]);
    }

    
    const deleteBookHandler = (employee_info) => {

        const filter_deleted_employee = (employee_state || []).filter(employe=>employe.id !== employee_info.id);
        setEmployeeData(filter_deleted_employee);
    }

    const editBookHandler = (employee_info) => {
        setEventStatus(true);
        setEventDetails(employee_info);
    }


    const handlerEditSubmit = (employee_info) =>{
       
        const updatedArray = (employee_state || []).map((employee)=>{

           
            return employee
        })

        setEventDetails(updatedArray);
    }



    const valueToShare = {
        employee_state,
        is_add_event,
        employee_selected_data,
        config,
        handleSubmitHandler,
        editBookHandler,
        handlerEditSubmit,
        deleteBookHandler
        }
        
        return(
            <EmployeeContext.Provider value={valueToShare}>
                {children}
            </EmployeeContext.Provider>
        )
}


export {EmployeeProvider};
export default EmployeeContext;
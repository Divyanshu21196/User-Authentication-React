import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {useState,useEffect} from 'react';
import {  useNavigate ,useParams} from 'react-router-dom';

import { EMAIL_REGEX } from "../constants/constants";
import { useEmployeContext } from "../hooks/CustomHooks"

import moment from"moment";


function EmployeeForm(){

    const {is_add_event,handleSubmitHandler,employee_state,handlerEditSubmit} = useEmployeContext();
    const { register, handleSubmit,formState:{errors,isSubmitting},setValue } = useForm();

    const [startDate, setStartDate] = useState(new Date());
    const [suceessMessage,setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const {id} = useParams();
   
    useEffect(()=>{
        if(!is_add_event)
            setFormValues()        
    },[])

    const setFormValues = () =>{
        const find_value = (employee_state || []).find(employee=>employee.id == id);

        if(find_value){
            setValue('name',find_value?.name);
            setValue('salary',find_value?.salary);
            setValue('email',find_value?.email);
            setValue('is_active',find_value?.is_active);
            setStartDate(new Date(find_value?.dob));
        }

    }


    const  onSubmit = async(data) => {

        const find_employee = (employee_state || []).find(employee=>employee.email == data.email);
        
        if(is_add_event && find_employee){
            alert('Employee with this email already exist')
            return
        }


        const new_obj_keys = {};
        new_obj_keys.id = (is_add_event) ?  (employee_state.length ? (employee_state.length + 1) : 1) : id; 
        new_obj_keys.salary = parseFloat(data.salary).toFixed(2);
        new_obj_keys.dob = moment(startDate).format("YYYY-MM-DD ");
        new_obj_keys.is_active = (is_add_event) ? true : data.is_active
        data = {...data,...new_obj_keys};

        if(is_add_event){
            handleSubmitHandler(data);
            setSuccessMessage('Employee Added SuccessFully');    
        }else{
            handlerEditSubmit(data);
            setSuccessMessage('Employee Details Edited Successfully');
        }

        
        setTimeout(()=>{navigate("/employe/")},2000)
    }

    return(
        <>
        {suceessMessage && <h2> {suceessMessage}</h2>}
        <div className="card m-3">
        <h2>{is_add_event ? 'Add' : 'Edit'} Employee</h2>
        <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Employee Name</label>
                <input name="name" type="text"  {...register("name", {required:'Name is required',maxLength:20,minLength:3 })} className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Enter Employee Name" />
                <div className="invalid-feedback">{errors.name?.message}</div>
                {errors?.name?.type == 'minLength' && <span>Name should be atleast 3 characters</span>}
                {errors?.name?.type == 'maxLength' && <span>Name should not exeed 20 characters</span>}
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input disabled={!is_add_event} {...register("email", {required:'Email is required', pattern: EMAIL_REGEX })} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Enter Employee Email"/>
                <div className="invalid-feedback">{errors?.email?.message}</div>
                <div className="invalid-feedback">{errors?.email?.type == 'pattern' &&  <span>Please enter a valid email address</span>}</div>
            </div>
            <div className="mb-3">
            <label className="form-label">D.O.B</label>
            <DatePicker maxDate={new Date()} className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="mb-3">
            <label className="form-label">Salary</label>
            <input name="salary" type="number" step="any" {...register('salary',{required:'Salary is required'})} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Salary"/>
            {errors?.salary?.message}
            </div>
            <button disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                Register
            </button>
            <Link to="../login" className="btn btn-link">Cancel</Link>
        </form>
    </div>
    </div>
    </>
    )
}

export default EmployeeForm
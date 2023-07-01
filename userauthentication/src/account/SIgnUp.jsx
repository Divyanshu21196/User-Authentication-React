import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../constants/constants";
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";



function SignUp(){

    const navigate = useNavigate();
    const [successMessage,setMessage] = useState('');


    const { register, handleSubmit,formState:{errors,isSubmitting} } = useForm();
    const  onSubmit = async(data) => {
        await createUserWithEmailAndPassword(auth,data?.email,data?.password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            setMessage('User Signed Up Successfully');
            setTimeout(()=>{
            navigate("/login")
            },1000)
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });
    }
    return(
    <>
    <>
    <span>{successMessage && successMessage}</span>
    </>
        <div className="card m-3">
            <h4 className="card-header">Sign Up</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input name="name" type="text"  {...register("name", {required:'Name is required',maxLength:20,minLength:3 })} className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Name" />
                        <div className="invalid-feedback">{errors.name?.message}</div>
                        {errors?.name?.type == 'minLength' && <span>Name should be atleast 3 characters</span>}
                        {errors?.name?.type == 'maxLength' && <span>Name should not exeed 20 characters</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input {...register("email", {required:'Email is required', pattern: EMAIL_REGEX })} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email"/>
                    {errors?.email?.message}
                    {errors?.email?.type == 'pattern' &&  <span>Please enter a valid email address</span>}
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input name="password" type="password" {...register('password',{required:'Password is required',minLength:6,maxLength:10})} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Password"/>
                    {errors?.password?.message}
                    {errors?.password?.type == 'minLength' && <span>Password should be atleast 6 digits</span>}
                    {errors?.password?.type == 'maxLength' && <span>Password should not exeed 10 digits</span>}
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

export {SignUp} 
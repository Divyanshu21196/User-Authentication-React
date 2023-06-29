import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../constants/constants";
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import useAuthContext from "../hooks/CustomHooks";
import {  useNavigate } from 'react-router-dom';

function Login(){


    const { setAuthenticatedUser,user_state } = useAuthContext();
    const navigate = useNavigate();

    const { register, handleSubmit,formState:{errors,isSubmitting} } = useForm();
    
    const onSubmit = (data) => {

        signInWithEmailAndPassword(auth, data?.email, data?.password)
        .then((userCredential) => {
  
        const user = userCredential.user;
        setAuthenticatedUser(user);
        navigate("/")
  
      })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });
    };
    console.log(errors)
    return(
        <div className="card m-3">
        {user_state.isLoggedIn ? 'Yes' :'No'}
        <h4 className="card-header">Login</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                Login
            </button>
            <Link to="../register" className="btn btn-link">Register</Link>
                </form>
            </div>
        </div>
    )
}

export {Login}

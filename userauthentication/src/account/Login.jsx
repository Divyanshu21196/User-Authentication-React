import { useForm } from "react-hook-form";


function Login(){

    const { register, handleSubmit,formState:{errors,isSubmitting} } = useForm();
    const onSubmit = data => console.log(data);

    return(
        <div className="card m-3">
        <h4 className="card-header">Login</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input {...register("email", {required:true, pattern: /^[A-Za-z]+$/i })} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email"/>
                    {errors.email && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                <label className="form-label">Password</label>
                <input name="password" type="password" {...register('password',{required:true})} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Password"/>
                {errors.password && <span>This field is required</span>}
                </div>
                <button disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                Login
            </button>
                </form>
            </div>
        </div>
    )
}

export {Login}

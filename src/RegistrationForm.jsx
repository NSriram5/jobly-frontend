import React, { useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

function RegistrationForm({register}) {
    const history = useHistory();
    const blankForm = {
        username:"",
        password:"",
        firstName:"",
        lastName:"",
        email:""
    }
    const [formData,setFormData] = useState(blankForm);
    const [errors,setErrors]=useState([]);

    const handleChange = evt => {
        const {name,value} = evt.target;
        setFormData(data=>({
            ...data,[name]:value
        }));
    }

    function printErrors(){
        if (errors.length!=0){
            return(
                <div className="alert alert-danger" role="alert">
                    {errors.map((err,index)=>{return(
                        <p key={index} className="mb-0 small">{err}</p>
                        )
                    })}
                </div>
            )
        } else {
            return(null);
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await setErrors([]);
        const success = await register(formData);
        if (success===true){
            setFormData(blankForm);
            history.push("/companies");
        } else {
            await setErrors(success)
        }
    }

    return (
        <div className="pt-5">
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">Sign Up</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input name="username" className="form-control" value={formData["username"]} onChange={handleChange} autoComplete="username"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" className="form-control" value={formData["password"]} onChange={handleChange} autoComplete="password"/>
                            </div>
                            <div className="form-group">
                                <label>First name</label>
                                <input name="firstName" className="form-control" value={formData["firstName"]} onChange={handleChange} autoComplete="given-name"/>
                            </div>
                            <div className="form-group">
                                <label>Last name</label>
                                <input name="lastName" className="form-control" value={formData["lastName"]} onChange={handleChange} autoComplete="family-name"/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={formData["email"]} onChange={handleChange} autoComplete="email"/>
                            </div>
                            {printErrors()}
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default RegistrationForm;
import React,{useState} from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

function Login({login,setToken}) {
    const history = useHistory();

    const blankForm = {
        username:"",
        password:""
    }

    const [formData,setFormData] = useState(blankForm);
    const [errors,setErrors]=useState(blankForm);

    const handleChange = evt => {
        const {name,value} = evt.target;
        setFormData(data=>({
            ...data,[name]:value
        }));
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        const success = login(formData);
        if (success){
            setFormData(blankForm);
            history.push("/");
        }
    }

    return (
        <div className="pt-5">
            <div className="LoginForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h3 className="mb-3">Log In</h3>
                    <div className="card">
                        <div className="card-body">
                            <form onChange={handleChange} onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input onChange={handleChange} value={formData["username"]} name="username" className="form-control" autoComplete="username" required=""/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input onChange={handleChange} type="password" value={formData["password"]} name="password" className="form-control" autoComplete="current-password" required=""/>
                                </div>
                                <button className="btn btn-primary float-right">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
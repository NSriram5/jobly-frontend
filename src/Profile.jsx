import React, { useContext, useState } from "react";
import UserContext from "./userContext";
import { useParams, useHistory, Redirect } from "react-router-dom";

function Profile({updateUser}) {
    const user = useContext(UserContext);
    const history = useHistory();
    const blankForm = {
        username:user.username,
        password:"",
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email
    }
    const [formData,setFormData] = useState(blankForm);
    const [errors,setErrors]=useState(blankForm);

    const handleChange = evt => {
        const {name,value} = evt.target;
        setFormData(data=>({
            ...data,[name]:value
        }));
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const success = await updateUser(formData);
        if (success){
            setFormData(blankForm);
            history.push("/companies");
        }
        
    }

    return (
        <div className="pt-5">
            <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <p className="form-control-plaintext">{user.username}</p>
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input name="firstName" className="form-control" onChange={handleChange} value={formData["firstName"]}/>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input name="lastName" className="form-control" onChange={handleChange} value={formData["lastName"]}/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" className="form-control" onChange={handleChange} value={formData["email"]}/>
                            </div>
                            <div className="form-group">
                                <label>Confirm password to make changes:</label>
                                <input type="password" name="password" className="form-control" onChange={handleChange} value={formData["password"]}/>
                            </div>
                            <button className="btn btn-primary btn-block mt-4">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
      </div>
    );
}
export default Profile;
import React, { useContext } from "react";
import UserContext from "./userContext";
import { NavLink, useHistory, Redirect } from "react-router-dom";

function Main() {
    const user = useContext(UserContext);
    
    return (
        <div className="pt-5">
            <div className="Homepage">
                <div className="container text-center">
                    <h1 className="mb-4 font-weight-bold">Jobly</h1>
                    <p className="lead">All the jobs in one, convenient place.</p>
                    {user.firstName?(
                        <h2>
                            Welcome back, {user.firstName}!
                        </h2>
                    ):(
                        <p>
                            <a className="btn btn-primary font-weight-bold mr-3" href="/login">Log in</a>
                            <a className="btn btn-primary font-weight-bold" href="/signup">Sign up</a>
                        </p>
                    )
                    }
                </div>
            </div>
        </div>
    );
}
export default Main;
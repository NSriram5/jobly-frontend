import React, { useContext, useEffect, useState } from "react";
import UserContext from "./userContext";
import "./JobCard.css";

function JobCard({job, jobApply}){
    const user = useContext(UserContext);

    const filteredJobs = user.applications.filter(application=>application===job.id);
    
    const apply = ()=>{
        jobApply(user.username,job.id);
    }

    return(
        <div className="JobCard card">
            <div className="card-body">
                        
                <h6 className="card-title">{job.title}
                </h6>
                <p>{job.companyHandle}</p>
                <div><small>Salary: {job.salary}</small></div>
                <div><small>Equity: {job.equity}</small></div>
                {filteredJobs.length>0?(
                <button className="btn btn-danger font-weight-bold text-uppercase float-right" disabled={true}>Applied</button>
                ):
                <button className="btn btn-danger font-weight-bold text-uppercase float-right" onClick={apply}>Apply</button>
                }
            </div>

        </div>
    )
}

export default JobCard;
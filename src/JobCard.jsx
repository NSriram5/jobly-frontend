import React, { useEffect, useState } from "react";
import "./JobCard.css";

function JobCard({job}){


    return(
        <div className="JobCard card">
                <div className="card-body" key={job.id}>
                        
                <h6 className="card-title">{job.title}
                </h6>
                <p>{job.companyHandle}</p>
                <div><small>Salary: {job.salary}</small></div>
                <div><small>Equity: {job.equity}</small></div>
                <button className="btn btn-danger font-weight-bold text-uppercase float-right">Apply</button>
            </div>

        </div>
    )
}

export default JobCard;
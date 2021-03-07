import React, { useEffect, useState } from "react";
import Jobs from "./Jobs";
import { useParams, useHistory, Redirect } from "react-router-dom";

function Company({get, jobApply}) {
    const [loading, setLoading] = useState(true);
    const [company,setCompany] = useState({jobs:[]});
    const {handle}=useParams();

    useEffect(()=>{
        async function getContent(){
            const loadedCompany = await get(handle);
            setCompany(loadedCompany);
            setLoading(false);
        }
        if (loading){
            getContent();
        }
    },[loading]);

    return (
        <div className="pt-5">
            <div className="CompanyDetail col-md-8 offset-md-2">
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            <Jobs items={company.jobs} term="" jobApply={jobApply}/>
            </div>
        </div>
    );
}
export default Company;
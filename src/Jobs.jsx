import React from "react";
import JobCard from "./JobCard";
import { useParams, useHistory, Redirect } from "react-router-dom";

function Jobs({items, term}) {
    let filteredItems = items;

    if (term != "") {
        let re = new RegExp(`.*(${term}).*`,'i');
        filteredItems = items.filter((item) => {
            return re.test(item.id) || re.test(item.title) || re.test(`${item.salary}`) || re.test(`${item.equity}`) || re.test(item.companyHandle);
        })
        
    }

    return (
        <div className="JobList">
            {filteredItems.map((job,index) => {
                return (
                    <JobCard key={index} job={job} />
                )
            })}
        </div>
    );
}
export default Jobs;
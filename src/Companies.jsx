import React, { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import CompanyCard from "./CompanyCard";

function Companies({ items, term }) {
    let filteredItems = items;

    if (term != "") {
        let re = new RegExp(`.*(${term}).*`,'i');
        filteredItems = items.filter((item) => {
            return re.test(item.handle) || re.test(item.name) || re.test(item.description) || re.test(`${item.numEmployees}`);
        })
        
    }


    return (
        <div className="CompanyList">
            Companies
            {filteredItems.map((company) => {
                return (
                    <CompanyCard key={company.handle} company={company} />
                )
            })}
        </div>
    );

}
export default Companies;
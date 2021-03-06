import React, { useEffect, useState } from "react";
import "./CompanyCard.css";

function CompanyCard({company}){
    return(
        <a className="CompanyCard card" href={`/companies/${company.handle}`}>
                <div className="card-body" key={company.handle}>
                        
                <h6 className="card-title">{company.name}
                
                <img className="float-right ms-5" src={company.logoUrl}/>
                </h6>
                <p><small>{company.description}</small></p>
                <p>{company.numEmployees}</p>
            </div>

        </a>
    )
}

export default CompanyCard;
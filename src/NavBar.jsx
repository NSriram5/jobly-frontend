import React from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import "./Navigation.css"

function Navbar({links}) {
    return (
        <nav className="Navigation navbar navbar-expand-md">
            <div className="container-fluid">
            <a className="navbar-brand" href="/">Jobly</a>
            <ul className="navbar-nav ms-auto">
                {links.map(link=>{
                    return(
                        <li key={link.title} className="nav-item mr-4">
                            <a className="nav-link {link.active?'active':''}" href={link.link}>
                                {link.title}
                            </a>
                        </li>
                    )
                })}
            </ul>
            </div>
        </nav>
    );
}
export default Navbar;
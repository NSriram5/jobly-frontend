import React from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

function Navbar() {

    return (
        <nav class="Navigation navbar navbar-expand-md">
            <div class="container-fluid">
            <a class="navbar-brand navbar-expand-md" href="/">Jobly</a>
            <ul class="navbar-nav ms-auto">
                <li class="nav-item me-4">
                    <a href="/login">
                        1
                    </a>
                </li>
                <li class="nav-item me-4">
                    <a href="/signup">
                        2
                    </a>
                </li>
                <li class="nav-item me-4">
                    <a href="/profile">
                        3
                    </a>
                </li>
                <li class="nav-item me-4">
                    <a href="/jobs">
                        4
                    </a>
                </li>
                <li class="nav-item-me-4">
                    <a href="/companies">
                        5
                    </a>
                </li>
            </ul>
            </div>
        </nav>
    );
}
export default Navbar;
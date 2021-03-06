import React, { useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

function Search({searchUpdate}) {
    const blankForm = {
        search:""
    }
    const [formData,setFormData] = useState(blankForm);
    const [errors,setErrors]=useState(blankForm);

    const handleChange = evt => {
        const {name,value} = evt.target;
        searchUpdate(value)
        setFormData(data=>({
            ...data,[name]:value
        }));
    }

    const clearForm = evt => {
        evt.preventDefault();
        setFormData(blankForm);
    }
    return (
        <div className="SearchForm mb-4">
            <form className="form-inline">
                <input className="form-control form-control-lg flex-grow-1" id="search" value={formData["search"]} onChange={handleChange} type="text" name="search" placeholder="Enter search term..."/>
                <button className="btn btn-lg btn-primary" onClick={clearForm}>Clear</button>
            </form>
        </div>
    );
}
export default Search;
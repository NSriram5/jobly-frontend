import React, { useEffect, useState } from "react";
import Search from "./Search";
import Jobs from "./Jobs";
import Companies from "./Companies";
import { useParams, useHistory, Redirect } from "react-router-dom";

function SearchableList({type, getList}) {
    const [term,setTerm] = useState("");
    const [loading,setLoading] = useState(true);
    const [items, setItems] = useState([]);
    useEffect(()=>{
        async function getItems(){
            let items = await getList();
            setItems(items);
            setLoading(false);
        }
        if (loading){
            getItems();
        }
    },[loading]);
    
    useEffect(()=>{
        setLoading(true);
    },[type]);

    if (loading){
        return(
            <>
                <Search searchUpdate = {setTerm}/>
                <p>Loading</p>
            </>
        )
    }

    if (type == "jobs"){
        return(
            <div className="pt-5">
                <div className="col-md-8 offset-md-2">
                    <Search searchUpdate = {setTerm}/>
                    <Jobs items = {items} term= {term}/>
                </div>
            </div>
        )
    } else if (type == "companies"){
        return(
            <div className="pt-5">
                <div className="col-md-8 offset-md-2">
                    <Search searchUpdate = {setTerm}/>
                    <Companies items = {items} term= {term}/>
                </div>
            </div>
        )
    } else {
        return <p>Unfound</p>
    }
    
}
export default SearchableList;
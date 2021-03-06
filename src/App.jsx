import React, { useState, useEffect } from "react";
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Login";
import RegistrationForm from "./RegistrationForm";
import Profile from "./Profile";
import Company from "./Company";
import Main from "./Main";
import NavBar from "./NavBar";

import logo from './logo.svg';
import './App.css';

import JoblyApi from "./api";
import SearchableList from "./SearchableList";

function App() {
  let jobly = new JoblyApi
  const [JoblyObj, setJoblyObj] = useState(jobly)
  const [token,setToken] = useState(localStorage.getItem("token")||"");

  useEffect(()=>{
    localStorage.setItem("token",token)

    if (token !== ""){
      const newJoblyObj = JoblyObj;
      newJoblyObj.token = token;
      setJoblyObj(newJoblyObj);
    }
  },[token])
  
  
  
  const getCompanyList = JoblyObj.getCompanies.bind(JoblyObj);
  const getCompany = JoblyObj.getCompany.bind(JoblyObj);
  const getJobList = JoblyObj.getJobs.bind(JoblyObj);
  const getJob = JoblyObj.getJob.bind(JoblyObj);
  const backendRegister =JoblyObj.postNewRegistration.bind(JoblyObj);
  const backendLogin = JoblyObj.postNewLogin.bind(JoblyObj);

  function logout(){
    setToken("");
  }

  function register(newUser){
    const token = backendRegister(newUser);
    debugger;
    const user = JoblyObj.getUser(newUser.username)
    setToken(token);
    return true;
  }

  function login(credentials){
    const token = backendLogin(credentials);
    const user = JoblyObj.getUser(credentials.username);
    debugger;
    setToken(token);
    return true;
  }
  

  function navlinks(){
    let navItems = [];
    if (token===""){
      navItems=[{title:"Login",link:"/login",active:false},{title:"Signup",link:"/signup",active:false}]
    } else if (token==="debugging"){
      navItems = [{title:"Login",link:"/login",active:false},{title:"Signup",link:"/signup",active:false},{title:"Profile",link:"/profile",active:false},{title:"Jobs",link:"/jobs",active:false},{title:"Companies",link:"/companies",active:false}]
    } else {
      navItems = [{title:"Companies",link:"/companies",active:false},{title:"Jobs",link:"/jobs",active:false},{title:"Profile",link:"/profile",active:false},{title:"Logout",link:"/logout",active:false,onClick:logout}]
    }
    return navItems
  }

  return (
    <BrowserRouter>
    <NavBar links={navlinks()}/>
    <Switch>
      <Route exact path="/login">
        <Login login={login} setToken={setToken}/>
      </Route>
      <Route exact path="/logout">
        <Redirect to="/"/>
      </Route>
      <Route exact path="/signup">
        <RegistrationForm register={register} setToken={setToken}/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route exact path="/jobs">
        <SearchableList getList={getJobList} type="jobs"/>
      </Route>
      <Route exact path="/companies/:handle">
        <Company get={getCompany}/>
      </Route>
      <Route exact path="/companies">
        <SearchableList getList={getCompanyList} type="companies"/>
      </Route>
      <Route exact path="/">
        <Main/>
      </Route>
      <Redirect to="/" />
    </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Jobs from "./Jobs";
import Companies from "./Companies";
import Company from "./Company";
import Main from "./Main";
import NavBar from "./NavBar";

import logo from './logo.svg';
import './App.css';

import JoblyApi from "./api";
import SearchableList from "./SearchableList";

function App() {
  const getCompanyList = JoblyApi.getCompanies;
  const getCompany = JoblyApi.getCompany;
  const getJobList = JoblyApi.getJobs;
  const getJob = JoblyApi.getJob;

  function navlinks(){
    const navItems = [{title:"Login",link:"/login",active:false},{title:"Signup",link:"/signup",active:false},{title:"Profile",link:"/profile",active:false},{title:"Jobs",link:"/jobs",active:false},{title:"Companies",link:"/companies",active:false}]
    return navItems
  }

  return (
    <BrowserRouter>
    <NavBar links={navlinks()}/>
    <Switch>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/signup">
        <Signup/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route exact path="/jobs">
        <SearchableList getList={getJobList} type="jobs"/>
      </Route>
        <Route exact path="/companies/:handle">
        <Company/>
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

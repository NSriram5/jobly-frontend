import React from "react";
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Jobs from "./Jobs";
import Companies from "./Companies";
import Company from "./Company";
import Main from "./Main";
import NavBar from "./NavBar.js";

import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import JoblyApi from "./api";

function App() {
  const getCompanyList = JoblyApi.getCompanies;
  const getCompany = JoblyApi.getCompany;
  const getJobList = JoblyApi.getJobs;
  const getJob = JoblyApi.getJob;


  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/login">
        <NavBar/>
        <Login/>
      </Route>
      <Route exact path="/signup">
        <NavBar/>
        <Signup/>
      </Route>
      <Route exact path="/profile">
        <NavBar/>
        <Profile/>
      </Route>
      <Route exact path="/jobs">
        <NavBar/>
        <Jobs/>
      </Route>
      <Route exact path="/companies/:handle">
        <NavBar/>
        <Company/>
      </Route>
      <Route exact path="/companies">
        <NavBar/>
        <Companies/>
      </Route>
      <Route exact path="/">
        <NavBar/>
        <Main/>
      </Route>
      <Redirect to="/" />
    </Switch>
    </BrowserRouter>
  );
}

export default App;

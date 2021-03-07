import React, { useState, useEffect } from "react";
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Login";
import RegistrationForm from "./RegistrationForm";
import Profile from "./Profile";
import Company from "./Company";
import Main from "./Main";
import NavBar from "./NavBar";
import UserContext from "./userContext";
import logo from './logo.svg';
import './App.css';

import JoblyApi from "./api";
import SearchableList from "./SearchableList";

function App() {
  let jobly = new JoblyApi
  const [JoblyObj, setJoblyObj] = useState(jobly)
  const [token,setToken] = useState(localStorage.getItem("token")||"");
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user"))||{})

  useEffect(()=>{
    localStorage.setItem("token",token)
    if (token !== ""){
      const newJoblyObj = JoblyObj;
      newJoblyObj.token = token;
      setJoblyObj(newJoblyObj);
      console.log(token)
    }
  },[token])

  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(user))
  },[user])

  const getCompanyList = JoblyObj.getCompanies.bind(JoblyObj);
  const getCompany = JoblyObj.getCompany.bind(JoblyObj);
  const getJobList = JoblyObj.getJobs.bind(JoblyObj);
  const userJobApply = JoblyObj.userJobApply.bind(JoblyObj);
  const backendRegister =JoblyObj.postNewRegistration.bind(JoblyObj);
  const backendLogin = JoblyObj.postNewLogin.bind(JoblyObj);
  const userPatch = JoblyObj.patchUser.bind(JoblyObj);

  const loadUser = async (userName)=>{
    const user = await JoblyObj.getUser(userName);
    setUser(user);
  }

  const loadToken = async (type,obj)=>{
    let newtoken;
    try{
      if (type=="register"){
        newtoken = await backendRegister(obj);
      } else if (type=="login"){
        newtoken = await backendLogin(obj);
      } 
      if (newtoken.error){
        return newtoken.error
      }
      setToken(newtoken);
      loadUser(obj.username);
      return true;
    } catch(err){
        return err;
    }
  }

  const updateUser = async(user)=>{
    const authSuccess = await backendLogin({username:user.username,password:user.password});
    if (authSuccess.error){
      return false;
    }
    const patchUser = await userPatch(user);
    if (patchUser.error){
      return false;
    }
    loadUser(user.username);
    return true;
  }

  const jobApply = async(username,jobId)=>{
    const applySuccess = await userJobApply({username,jobId});
    if (applySuccess.error){
      return false;
    }
    await loadUser(username);
    return true;
  }

  function logout(){
    setToken("");
    setUser({});
  }

  function register(newUser){
    return loadToken("register",newUser);
  }

  function login(credentials){
    return loadToken("login",credentials);
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
      <UserContext.Provider value={user}>
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
          <Profile updateUser={updateUser}/>
        </Route>
        <Route exact path="/jobs">
          <SearchableList getList={getJobList} jobApply={jobApply} type="jobs"/>
        </Route>
        <Route exact path="/companies/:handle">
          <Company get={getCompany} jobApply={jobApply}/>
        </Route>
        <Route exact path="/companies">
          <SearchableList getList={getCompanyList} type="companies"/>
        </Route>
        <Route exact path="/">
          <Main/>
        </Route>
        <Redirect to="/" />
      </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

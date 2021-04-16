import React, { useState, useEffect } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
//import auth from './common/authUser'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Home from './components/Home';
import View from './components/View';
import {Route,Switch} from 'react-router-dom'
import Register from './components/Register';
import Navbar from './components/Navbar';
import Registerd from './components/Registerd';
import Login from './components/Login';
import Edit from './components/Edit';
import Logout from './components/Logout'
import Course from './components/Course'
import Student from './components/Student'
import Cget from './components/Cget'
import Cadd from './components/Cadd'
 axios.defaults.headers.common['x-api-key'] = localStorage.getItem('token');


function App() {

  const [users,setUsers] = useState()
  useEffect(() => {
    try {
      let jwt = localStorage.getItem('token')
      const user = jwt_decode(jwt)
      setUsers(user)
    } catch (ex) {}
  }, [])


  return (
    <div className="App">
      <Navbar user={users}/>
      <Switch>
        <Route path='/' exact render={props=>{
          if(!users) return <Redirect to="/login"/>
          return <Home {...props} />
        }} />
        <Route path='/view/:_id' render={user=><View {...user} user={users}/>} /> 
         {/* <Route path='/myprofile/:_id' component={Profile} />  */}
        <Route path='/edit/:_id' component={Edit}/> 
        <Route path ='/register' component={Register} />
        <Route path ="/users" component={Registerd}/>
        <Route path = "/login" component={Login}/>
        <Route path = "/logout" component={Logout}/>
        <Route path = '/course' component={Course} />
        <Route path = '/student' user={users} component={Student} />
        <Route path = '/cget' component={Cget} />
        <Route path = '/cadd/:_id' component={Cadd} />
      </Switch> 
    </div>
  );
}

export default App;





// https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81
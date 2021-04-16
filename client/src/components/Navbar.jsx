import React from 'react'
import {Link , NavLink} from 'react-router-dom'
import { useEffect } from 'react';
function Navbar({user}) {
/*  useEffect(()=>{
  console.log(user.roles)
 },[])
 */

     return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-white bg-dark">
        <Link className="navbar-brand" to="#">College</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <NavLink className="nav-link" to="/users">Dashboard</NavLink>
      </li>
        {user && user.roles==='admin'?<li className="nav-item">
        <NavLink className="nav-link" to="/course">Course</NavLink>
       </li>:''}
         {user && user.roles==='user'?<li className="nav-item">
        <NavLink className="nav-link" to="/student">Student</NavLink>
       </li>:''} 

       {user && user.roles==='user'?<li className="nav-item">
        <NavLink className="nav-link" to="/cget">Course</NavLink>
       </li>:''}
        
        {!user &&(
        <>
        <li className="nav-item">
        <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
      </> )}

      {user &&(
        <>
        <li className="nav-item">
        <NavLink className="nav-link" to="/">{user.roles}</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
        </li>
      </> )}
     
     </ul>
  </div>
</nav>
</div>
    )
}

export default Navbar

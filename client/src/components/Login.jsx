import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
    email: yup.string().required("Email should not be empty").email("Email should be valid"),
    password: yup.string().required('Password should not be empty').min(6,'Password should have atleast 4 char').max(15)
  });


function Login() {
    let history = useHistory()

    const [user,setUser] = useState({
      email:'', password:''
    });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = e=>{
      setUser({...user ,[e.target.name]:e.target.value})
  }

  const submitForm = async() => {
    console.log(user)
    const {data} =await axios.post('http://localhost:8080/api/user/login',user)
    console.log(data)
    localStorage.setItem("token",data.token)
    localStorage.setItem("roles",data.roles)
    localStorage.setItem("_id",data._id)
    //history.push("/")
    window.location="/users"
  };
    return (
        <div>
            <h1>This is login page </h1>

            <div className="Form">
           <div className="inputs">
          <form onSubmit={handleSubmit(e=>submitForm(e))}>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={e=>handleChange(e)}
            placeholder="Email"
            ref={register}
          />
          <p className="errors"> {errors.email?.message} </p>

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={e=>handleChange(e)}
            placeholder="Password"
            ref={register}
          />
          <p className="errors"> {errors.password?.message} </p>
         <button type="submit" className="btn btn-primary" disabled={user.email.length<1 || user.password.length<1}>Submit</button>
        </form>
      </div>
    </div>
        </div>
    )
}

export default Login

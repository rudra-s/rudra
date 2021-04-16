import React, { useState } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { useHistory } from "react-router-dom";


const schema = yup.object().shape({
  name: yup.string().required("Name should be required please").min(4,'Name must have atleast 4 char').max(20,'Less than 20 char'),
  email: yup.string().required("Email should not be empty").email("Email should be valid"),
  phone: yup.string().required("Phone number should not empty"),
  department:yup.string().required('Should not be empty').min(2,'at least 2 char').max(10,'less than 10 char'),
  password: yup.string().required('Password should not be empty').min(6,'Password should have atleast 4 char').max(15,'max char 15'),
  cpassword: yup.string().required('Confirm password is required').oneOf([yup.ref("password"), 'Password does not match']),
  roles:yup.string().required('Select your preferance'),
  photo:yup.string()
});

function Form() {
    let history = useHistory()
    // const [fileName , setFileName] = useState()

    // const formData = new FormData()
    // formData.append("name",name)
    // formData.append("email",email)
    // formData.append("phone",phone)
    // formData.append("password",password)
    // formData.append("cpassword",cpassword)
    // formData.append("roles",roles)
    // formData.append("photo",photo)
    const [user,setUser] = useState({
        name:'' , email:'',phone:'',department:'', password:'',cpassword:'',roles:'',photo:''
    })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = e=>{
      setUser({...user ,[e.target.name]:e.target.value})
  }
 
  const submitForm = async() => {
   try {
    const response = await axios.post('http://localhost:8080/api/user/register',user);
    localStorage.setItem("token",response.headers['x-api-key'])
    //localStorage.setItem("roles",user.roles())
   // history.push("/")
    window.location ="/users"
   } catch (error) {
       console.log(error)
   }
  };
  return (
    <div className="Form">
      <div className="title">Sign Up</div>
      <div className="inputs">
        <form onSubmit={handleSubmit(e=>submitForm(e))} onReset={reset}>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={e=>handleChange(e)}
            ref={register}
            placeholder="Name"
            className={`${errors.name ? 'is-invalid' : ''}`}
          />
          <p className="errors"> {errors.name?.message} </p>
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
            type="text"
            name="phone"
            value={user.phone}
            onChange={e=>handleChange(e)}
            placeholder="Phone"
            ref={register}
          />
          <p className="errors"> {errors.phone?.message} </p>
          <input
            type="text"
            name="department"
            value={user.department}
            onChange={e=>handleChange(e)}
            placeholder="Department"
            ref={register}
          />
          <p className="errors"> {errors.department?.message} </p>

           <select className="form-select form-select-sm mb-2" 
           value={user.roles} name="roles" onChange={e=>handleChange(e)} ref={register} >
         <option>Select your role</option>
         <option>user</option>
          <option>admin</option> 
         </select> 
         <br/> 

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={e=>handleChange(e)}
            placeholder="Password"
            ref={register}
          />
          <p className="errors"> {errors.password?.message} </p>
           <input
            type="password"
            name="cpassword"
            onChange={e=>handleChange(e)}
            placeholder="Confirm Password"
            ref={register}
          />
          <p className="errors"> {errors.cpassword && "Passwords Should Match!"} </p> 

          <lable htmlFor ="photo" >upload file</lable>
          <input type="file" filename="photo" className="form-control-file" />

         <button type="submit" className="btn btn-primary mt-1">Submit</button>
         <button className="btn btn-secondary ml-2" type="reset">Reset</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
import React, { useState,useEffect } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { useHistory,useParams ,Link } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Name should be required please").min(4,'Name must have atleast 4 char'),
  email: yup.string().required("Email should not be empty").email("Email should be valid"),
  phone: yup.number().required("Phone number should not empty"),
  department:yup.string().required('Should not be empty'),
});

function Form() {
    let history = useHistory()
    let _id = useParams()

    const [user,setUser] = useState({
        name:'' , email:'',phone:'',department:''
    })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = e=>{
      setUser({...user ,[e.target.name]:e.target.value})
  }

  const submitForm = async() => {
    console.log(user)
     await axios.put(`http://localhost:8080/api/user/update/${_id._id}`,user);
    history.push("/users")

  };
    useEffect(() => {
    loadUser()
   }, [])

  const loadUser = async()=>{
      const result = await axios.get(`http://localhost:8080/api/user/users/${_id._id}`)
      console.log(result)
      setUser(result.data)
  }
  return (
    <div className="Form">
      <div className="title">Update Profile</div>
      <div className="inputs">
        <form onSubmit={handleSubmit(e=>submitForm(e))}>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={e=>handleChange(e)}
            ref={register}
            placeholder="Name"
          />
          <p> {errors.name?.message} </p>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={e=>handleChange(e)}
            placeholder="Email"
            ref={register}
          />
          <p> {errors.email?.message} </p>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={e=>handleChange(e)}
            placeholder="Phone"
            ref={register}
          />
          <p> {errors.phone?.message} </p>
          <input
            type="text"
            name="department"
            value={user.department}
            onChange={e=>handleChange(e)}
            placeholder="Department"
            ref={register}
          />
          <p> {errors.department?.message} </p>
         <button type="submit" className="btn btn-primary">Update</button>
         {/* <Link className="btn btn-success ml-2" to={`/profile/${user._id}`}>Profile</Link> */}
        </form>
      </div>
    </div>
  );
}

export default Form;

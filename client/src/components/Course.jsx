import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import Cread from './Cread';
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
    cname:yup.string().required('provide course name').max(15,'not to be more than 15 char').min(3,'not less than 3 char'),
    cdepartment:yup.string().required('provide course department name').max(15,'not to be more than 15 char').min(3,'not less than 3 char'),
})

function Course() {
    let history = useHistory()
    const [courses,setCourses] = useState({
        cname:'',cdepartment:''
    })

    const {register,handleSubmit,errors,reset} = useForm({
          resolver:yupResolver(schema)
    })

    const handleChange = e =>{
        setCourses({...courses,[e.target.name]:e.target.value})
       // console.log(e.target.value)
    }

    const submitForm = async(e)=>{
       // e.preventDefault()
        console.log(courses)
        await axios.post('http://localhost:8080/api/user/course/post',courses)
        window.location="/course"
       //history.push("/course")
    };

    return (
        <>
        <div className="row">
        <div className ="col-md-4 ml-3 mt-3">
        <h1>Create a Course</h1>
        <form onSubmit={handleSubmit(e=>submitForm(e))} onReset={reset}>
          <input
            type="text"
            name="cname"
            value={courses.cname}
            onChange={e=>handleChange(e)}
            ref={register}
            placeholder="Course name"
          />
           <p className="errors"> {errors.cname?.message} </p>

           <input
            type="text"
            name="cdepartment"
            value={courses.cdepartment}
            onChange={e=>handleChange(e)}
            ref={register}
            placeholder="Department name"
          />
           <p className="errors"> {errors.cdepartment?.message} </p>
           
           <button type="submit" className="btn btn-success">Create Course</button>
           <button type="reset" className="btn btn-dark ml-2">Reset Course</button>
           </form>
        </div>
        <Cread />
        </div>
</>
)
}

export default Course

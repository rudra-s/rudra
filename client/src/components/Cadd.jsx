import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { useHistory, useParams ,Link} from 'react-router-dom';

const schema = yup.object().shape({
    cname:yup.string().required('provide course name').max(15,'not to be more than 15 char').min(3,'not less than 3 char'),
    cdepartment:yup.string().required('provide course department name').max(15,'not to be more than 15 char').min(3,'not less than 3 char'),
})

function Cadd() {
   
    let history = useHistory()
    let _id = useParams()
    const [courses,setCourses] = useState({
        cname:'',cdepartment:''
    })

    const {register,handleSubmit,errors} = useForm({
          resolver:yupResolver(schema)
    })

    const handleChange = e =>{
        setCourses({...courses,[e.target.name]:e.target.value})
    }

    // const userCourse =()=>{
    //     let user = localStorage.getItem('_id')
    //     if(user.course.includes(_id))
    //     return console.log("Already taken")
    // } 

    useEffect(()=>{
        loadCourse()
    },[])

    const submitForm = async()=>{
        console.log(courses)
          let result = await axios.put(`http://localhost:8080/api/user/course/put/${_id._id}`)
          if(result){
            history.push("/student")
          } else{
            alert('already taken')
          }
         
    };

     const loadCourse = async () =>{
         const result = await axios.get(`http://localhost:8080/api/user/course/${_id._id}`)
         setCourses(result.data)
         console.log(result.data)
     }
    return (
        <>
        <div className="row">
        <div className ="col-md-4 ml-3 mt-3">
        <h1>Get Course</h1>
        <form onSubmit={handleSubmit(e=>submitForm(e))}>
          <input
            type="text"
            name="cname"
            value={courses.cname}
            onChange={e=>handleChange(e)}
            ref={register}
            placeholder="Course name"
            readOnly={true}
          />
           <p className="errors"> {errors.cname?.message} </p>

           <input
            type="text"
            name="cdepartment"
            value={courses.cdepartment}
            onChange={e=>handleChange(e)}
            ref={register}
            placeholder="Department name"
            readOnly={true}
          />
           <p className="errors"> {errors.cdepartment?.message} </p>
           {<button type="submit" className="btn btn-success" >Update</button>}
           <Link className="btn btn-dark ml-2" to="/cget">Back </Link>
           </form>
        </div>
        </div>
</>
)
}

export default Cadd

import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'


function Cread() {

    let _id = useParams()
    const [course,setCourse] = useState([])
    useEffect(()=>{
        loadCourse()
    },[])


    const loadCourse=async()=>{
        const result = await axios.get('http://localhost:8080/api/user/course/allcourse')
        setCourse(result.data)
        console.log(result.data)
    }

    const deleteCourse = async(_id)=>{
        let response = await axios.delete(`http://localhost:8080/api/user/course/remove/${_id}`)
        if(response)
        return alert('course deleted successfully')
        loadCourse()
    }


    return (
     
        <div className="col-md-12 mr-2 mt-4">
            {localStorage.getItem('roles')==='admin' ? <h1>Created Course</h1>:<h1>Take Course</h1>}
            <table className="table">
            <thead>
            <tr>
           <th scope="col">Course_id</th>
           <th scope="col">C_Name</th>
          <th scope="col">C_Department</th>
          <th scope="col">Created</th>
          {localStorage.getItem('roles')==='user'&&(
              <th scope="col">Action</th>
          )}
            {localStorage.getItem('roles')==='admin'&&(
              <th scope="col">Remove</th>
          )}
          </tr>
         </thead>
        <tbody>
        {course.map((courses,index)=>
            <tr key={index}>
            <td>{courses._id}</td>
            <td>{courses.cname}</td>
            <td>{courses.cdepartment}</td>
            { <td>{courses.created_at.split('T')[0]}</td> }

            {localStorage.getItem('roles')==='user'&&(
                <td><Link className="btn btn-info" to={`/cadd/${courses._id}`}>Add </Link></td>
            )}
             {localStorage.getItem('roles')==='admin'&&(
                <td><button className="btn btn-danger" onClick={()=>deleteCourse(courses._id)}>Delete</button></td>
            )}
            </tr>
        )}
      
  </tbody>
</table>
</div>

)
}

export default Cread

import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import Course from './Course';


function Student() {
    //let _id = localStorage.getItem('_id')
    const [student,setStudent] = useState([])
    const [courses , setCourses] = useState([])

    useEffect(()=>{
        loadStudent()
    },[])

    const loadStudent = async()=>{
        let result = await axios.get(`http://localhost:8080/api/user/course/get/${ localStorage.getItem('_id')}`)
        setStudent(result.data)
        setCourses(result.data.course)
        console.log(result.data)
        console.log(result.data.course[0])
    }

    return (
        <>
        <h1 className="tag">This is student data </h1>
        <div className="col d-flex justify-content-center mt-3 ml-3">
           
            <div className="card" style={{width:'28rem'}}>
            <img className="card-img-top" src="https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg" alt="Card image cap"/>
            <div className="card-body">
            <h5 className="card-title">My profile</h5>
            <p className="card-text">My status</p>
            </div>
                  
                <ul className="list-group list-group-flush">
                <li className="list-group-item">Student_Id : {student._id}</li>
                  <li className="list-group-item">Name : {student.name}</li>
                  <li className="list-group-item">Email : {student.email}</li>
                  <li className="list-group-item">Phone : {student.phone}</li>
                  <li className="list-group-item">Department : {student.department}</li>
                  </ul>

                <select class="form-select" aria-label="Default select example">
                   <option selected>Check Course Info</option>
                   {courses.map((course)=>
                   <option value="1">{course.cname}
                   
                   </option>
                   )}
                </select>

                  {/* {courses.map((course,index)=>
                      <ul key={index} className="list-group list-group-flush">
                      <li className="list-group-item">{course.cname}</li>
                      <li className="list-group-item">{course.cdepartment}</li>
                      <li className="list-group-item">{course._id}</li>
                      </ul>
                  )} */}
           
           </div>
           </div>
        </>
    )
}

export default Student

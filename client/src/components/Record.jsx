import React, { useState } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { useHistory,Link } from "react-router-dom";

const schema = yup.object().shape({
  dob: yup.date().required("Date of birth"),
  state: yup.string().required("your state name").min(3,' valid state please').max(20 ,'valid state name'),
  postcode: yup.number().required("postal code"),
  country:yup.string().required('Should not be empty'),
  xcgpa: yup.number().required('10th cgpa or percent'),
  xpass:yup.number().required('passing year'),
  xiicgpa: yup.number().required('10th cgpa or percent'),
  xiipass:yup.number().required('passing year')
});

function Record() {
    let history = useHistory()

    const [user,setUser] = useState({
        dob:'' , state:'',postcode:'',country:'', xcgpa:'',xpass:'',xiicgpa:'',xiipass:''
    })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = e=>{
      setUser({...user ,[e.target.name]:e.target.value})
  }
 
  const submitForm = async() => {
   try {
    console.log(user)
    await axios.post('http://localhost:8080/api/user/data/record/',user);
    //history.push(`/view ${user._id}`)
   } catch (error) {
       console.log(error)
   }

  };
  return (
    <div className="Form">
      <div className="title">Let us know about you</div>
      <div className="inputs">
        <form onSubmit={handleSubmit(e=>submitForm(e))}>
          <input
            type="text"
            name="dob"
            value={user.dob}
            onChange={e=>handleChange(e)}
            ref={register}
            placeholder="Date of birth"
          />
           <p className="errors"> {errors.dob?.message} </p>
          <input
            type="text"
            name="state"
            value={user.state}
            onChange={e=>handleChange(e)}
            placeholder="State"
            ref={register}
          />
           <p className="errors"> {errors.state?.message} </p>
          <input
            type="text"
            name="postcode"
            value={user.postcode}
            onChange={e=>handleChange(e)}
            placeholder="Postcode"
            ref={register}
          />
           <p className="errors"> {errors.postcode?.message} </p>
          <input
            type="text"
            name="country"
            value={user.country}
            onChange={e=>handleChange(e)}
            placeholder="Country"
            ref={register}
          />
           <p className="errors"> {errors.country?.message} </p>

          <input
            type="text"
            name="xcgpa"
            value={user.xcgpa}
            onChange={e=>handleChange(e)}
            placeholder="10th Marks"
            ref={register}
          />
           <p className="errors"> {errors.xcgpa?.message} </p>

          <input
            type="text"
            name="xpass"
            value={user.xpass}
            onChange={e=>handleChange(e)}
            placeholder="10th passing year"
            ref={register}
          />
           <p className="errors"> {errors.xpass?.message} </p>

          <input
            type="text"
            name="xiicgpa"
            value={user.xiicgpa}
            onChange={e=>handleChange(e)}
            placeholder="12th Marks"
            ref={register}
          />
           <p className="errors"> {errors.xiicgpa?.message} </p>

          <input
            type="text"
            name="xiipass"
            value={user.xiipass}
            onChange={e=>handleChange(e)}
            placeholder="12th passing year"
            ref={register}
          />
           <p className="errors"> {errors.xiipass?.message} </p>

          
         <button type="submit" className="btn btn-primary">Submit</button>
          {/* <Link className="btn btn-info ml-2" to={`/myprofile/${user._id}`}>View</Link>  */}
        </form>
      </div>
    </div>
  );
}

export default Record; 

import React, { useState, useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import Search from '../common/Search'
import axios from 'axios'
import _ from 'lodash'
import Filter from '../common/Filter'
const pageSize = 5
function Registerd() {
  
  const _id = useParams()
    const[users,setUsers] = useState([])
    const [search,setSearch] = useState('')
    const [currentPage,setCurrentPage] = useState(1)
    const [paginateData,setPaginateData] = useState([])
    const [sort , setSort] = useState({path:'name',order:'asc'})

    useEffect(() => {
        loadUser()
        
    }, [])

    const loadUser = async()=>{
        const result = await axios.get('http://localhost:8080/api/user/users/')
        setUsers(result.data.reverse())
        setPaginateData(_(result.data).slice().take(pageSize).value())
        console.log(result.data)
    }

    const deleteUser = async(_id)=>{
      const response = await axios.delete(`http://localhost:8080/api/user/remove/${_id}`)
      console.log(response)
      loadUser();
    }

    const onSearch =(value)=>{
      setSearch(value)
      console.log(value)
    }
    
    let userData = users.filter(i=>{
      return (i.name.toLowerCase().includes(search)
      || i.department.toLowerCase().includes(search)
      )
    },[])

    const onSort =(path)=>{
      const sorts = {...sort}
      if(sorts.path===path)
      sorts.order = sorts.order==='asc'? <i class="fas fa-sort-down"></i> :<i class="fas fa-sort-up"></i>
      else{
        sorts.path =path
        sorts.order = 'asc'
      }
      setSort({path , order:'asc'})
    }


    const pageCount = users ? Math.ceil((users.length/pageSize)) :null
    if(pageCount===1) return null

    const pages = _.range(1,pageCount+1)

    const paginate = (page)=>{
      setCurrentPage(page)
      const start = (page-1)*pageSize
      const pagination = _(users).slice(start).take(pageSize).value()
      setPaginateData(pagination)
    }

    const sorted = _.orderBy(paginateData,sort.path,sort.order)


return (
  <>
  <div className="col-md-3">
  <Filter />
</div>

  <div className ="col-md-9 ml-3 display-flex">
  <div className="col-md-9 d-flex flex-row-reverse mt-1 mb-1">
  <Search onSearch={onSearch} />

  </div>
  

<div className='container mt-2'>
<table className="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col">User</th>
      <th className="click" onClick={()=>onSort('name')}>Name</th>
      <th>Email</th>
      <th className="click" onClick={()=>onSort('phone')}>Phone</th>
      <th className="click" onClick={()=>onSort('department')}>Department</th>
       {/* {localStorage.getItem('token')&&  localStorage.getItem('_id')===users._id && <th>Edit</th>} */}
      {/* {localStorage.getItem('token' ) && localStorage.getItem('roles')==='admin' ? <th>Profile</th>:''}  */}
      {localStorage.getItem('token') && localStorage.getItem('roles')==='admin' &&(<th>Remove</th>)}

    </tr>
  </thead>
  <tbody>
      {(search===''? sorted:userData).map((user,index)=>(
           <tr key={index}>
           <td>{index+1}</td>
           <td>{user.name}</td>
           <td>{user.email}</td>
           <td>{user.phone}</td>
          <td>{user.department}</td>
          <td><img style={{width:'100px'},{height:'100px'}} src={user.photo} alt="user"/></td>
          {localStorage.getItem('token') && localStorage.getItem('_id')===user._id &&
           <td>
            <Link className="btn btn-success" to={`/edit/${user._id}`}> Edit </Link>  
          </td>
          }
          {/* {localStorage.getItem('token') && localStorage.getItem('roles')==='admin'?
          <td>
          <Link className="btn btn-primary ml-1" to={`/view/${user._id}`}>View</Link>
          </td>:''
          } */}
          {localStorage.getItem('token')&& localStorage.getItem('roles')==='admin'?
          <td>
          <button className="btn btn-danger" onClick={()=>deleteUser(user._id)}>Delete</button>
          </td>:""
          }
         </tr>

      ))}
  </tbody>
 
</table> 
<nav className="d-flex justify-content-center">
  <ul className="pagination click">
    {pages.map(page=>(
      <>
      <li key={page} className={currentPage===page ?'page-item active':'page-item'} >
        <a className="page-link" onClick={()=>paginate(page)}>{page}</a></li>
       
        </>
    ))}
      
  </ul>
</nav> 
</div>
</div>

</>
)
}

export default Registerd

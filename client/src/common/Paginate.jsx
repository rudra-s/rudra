import React,{useState} from 'react'
import _ from 'lodash'

const pageSize = 5
function Paginate() {
  const [users] = useState([])
  const [paginatePost,setPaginatePost] =useState([])
  const [currentPage,setCurrentPage] = useState(1)


  const pageCount = users ? Math.ceil((users.length/pageSize)):null;
  if(pageCount===1) return null
  const pages = _.range(1,pageCount+1)

  const pagination =(pageNo)=>{
    setCurrentPage(pageNo)
    const start = (pageNo-1)*pageSize
    const paginate = _(users).slice(start).take(pageSize).value()
    setPaginatePost(paginate)
  }


  return(
    <nav className="d-flex justify-content-center">
  <ul className="pagination">
    {pages.map(page=>(
      <>
      <li className={currentPage===page ?'page-item active':'page-item'}>
        <a className="page-link" onClick={()=>pagination(page)} >{page}</a></li>
       
        </>
    ))}
      {/* <li onClick={next()}>Next</li>  */}
  </ul>
</nav>

  );

}
export default Paginate



















/*
const [users] = useState([])
const [pageNumber, setPageNumber] = useState(0);

const usersPerPage = 10;
const pagesVisited = pageNumber * usersPerPage;

const displayUsers = users
  .slice(pagesVisited, pagesVisited + usersPerPage)
  .map((user) => {
    return (
       <div className="user">
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
       <td>{user.department}</td>
       {user.address.map(i=>(
           <td>{i.state},{i.code}</td>
       ))}
   </div>
    );
  });

const pageCount = Math.ceil(users.length / usersPerPage);

const changePage = ({ selected }) => {
  setPageNumber(selected);
};

return (
  <div className="App">
  {displayUsers}
  <ReactPaginate
    previousLabel={"Previous"}
    nextLabel={"Next"}
    pageCount={pageCount}
    onPageChange={changePage}
    containerClassName={"paginationBttns"}
    previousLinkClassName={"previousBttn"}
    nextLinkClassName={"nextBttn"}
    disabledClassName={"paginationDisabled"}
    activeClassName={"paginationActive"}
  />
</div>
);
}*/
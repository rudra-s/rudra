import React,{useEffect} from 'react'

function Logout() {
    useEffect(()=>{
        localStorage.clear()
        window.location="/login";
    },[])
    return (
        <>
        </>
    )
}

export default Logout

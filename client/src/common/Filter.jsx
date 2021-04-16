import React from 'react'

function Filter() {
    return (
        <div className="form-group">
        <label className="filter-col" style={{marginLeft:"0px",top:'0px'}} htmlFor="pref-orderby">Department:</label>
        <select id="pref-orderby" className="form-control">
        <option>Select your department</option>
        </select>  
        </div>
    )
}

export default Filter

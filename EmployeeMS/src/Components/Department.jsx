import React from 'react'
import { Link } from 'react-router-dom'

 const Department = () => {
  return (
    <div className='px-5 mt-5'>
      <div className='d-flext justify-content-center'>
        <h3>Department List</h3>
      </div>
      <Link to="/dashboard/add_department" className='btn btn-sucess'>Add Departments</Link>
    </div>
  )
}
export default Department
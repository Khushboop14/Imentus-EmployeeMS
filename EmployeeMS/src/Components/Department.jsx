import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Department = () => {
  const [department, setDepartment] = useState([])
  //useEffect is used, whenever we want to fatch data from outside.  
  // there are three variation for useEffect simple, array, empty array(means first time reandring )
  //get list of department 
  useEffect(() => {
    axios.get('http://localhost:3000/auth/department')
      .then(result => {
        if (result.data.Status) {
          setDepartment(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => {
        console.log("error fetching departments:", err);
      })
  }, []);

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Department List</h3>
      </div>
      <Link to="/dashboard/add_department" className='btn btn-success'>Add Department</Link>

      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Departments</th>
            </tr>
          </thead>
          <tbody>
            {
              department.length > 0 ? ( 
              department.map(d => (
                <tr>
                  <td>{d.did}</td>
                  <td>{d.department}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No departments available.</td>
              </tr>
            )}

          </tbody>

        </table>
      </div>
    </div>

  )
}
export default Department
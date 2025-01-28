import React , {useState, useEffect }from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Employee = () => {
  
  const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:3000/auth/employee')
    .then(res => {
      if(res.data.Status) {
        setData(res.data.Result);
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err => console.log(err));
  }, []); 

  // const handleDelete = (eid) => {
  //   axios.delete('http://localhost:3000/delete'+id)
  //   .then(res => {
  //     if(res.data.Status === "Success") {
  //       setData(prevData => prevData.filter(emp => emp.id !== id)); 
  //     } else {
  //       alert("Error deleting employee");
  //     }
  //   })
  //   .catch(err => console.log(err));
  // }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Salary</th>
              <th>mail</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
             data.length > 0 ? ( 

            data.map(employee => (
            <tr>
              <td>{employee.eid}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>{employee.mail}</td>
              <td>
                <Link to={'/edit_employee/${employee.eid}'} className='btn btn-primary btn-sm me-2'>edit</Link>
                <button onClick={e => handleDelete(employee.eid)} className='btn btn-sm btn-danger'>delete</button>
              </td>
            </tr>
            ))
          ):(
              <tr>
                <td colSpan="2">No Employee available.</td>
              </tr>
            )
          }

          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Employee


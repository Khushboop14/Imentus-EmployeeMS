import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AddDepartment = () => {
  const [department, setDepartment] = useState();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Department:", department); 
    axios
        .post('http://localhost:3000/auth/add_department', { department })
        .then((result) => {
            console.log("Server Response:", result.data); // Debugging the server response
            if (result.data.Status) {
                navigate('/dashboard/department');
            } else {
                alert(result.data.Error);
            }
        })
        .catch((err) => console.error("Axios Error:", err));
};

  return (
    <div className="d-flex justify-content-center align-items-center h-75 ">
    <div className="p-3 rounded w-25 border ">
 
      <h2>Add Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email"><strong>Departments:</strong></label>
          <input
            type="text"
            name="department"
            placeholder="Enter Department"
            onChange={(e) => setDepartment( e.target.value )}
            className="form-control rounded-0"
          />
        </div>
        <button className='btn btn-success w-100 rounded-0 mb-2'>Add</button>
      </form>
    </div>
  </div>
  )
}
export default AddDepartment